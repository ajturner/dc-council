import { Component, Host, h, State, Prop, Listen } from '@stencil/core';
import { loadAgencies, loadBlank, loadCommittees, loadMembers } from '../../utils/data';
import state, { getTemplateParam, getVersion } from '../../utils/state';
import { CouncilTemplate, ICommittee, IMember } from '../../utils/types';

@Component({
  tag: 'dc-council-game',
  styleUrl: 'dc-council-game.css',
  scoped: true,
})
export class DcCouncilGame {

  @Prop({ mutable: true, reflect: true }) template: CouncilTemplate = CouncilTemplate.current;

  /**
   * URL to Agency spreadsheet
   */
  @Prop() agencyFilename: string = "assets/2022/agencies.csv";
  @Prop() committeeFilename: string = "assets/2022/committees.csv";
  @Prop() memberFilename: string = "assets/2022/members.csv";

  @Prop({ mutable: true, reflect: true }) selectedPieces: string = "agencies";

  @State() agencies = [];
  @State() committees: Array<ICommittee> = [];
  @State() members: Array<IMember> = [];
  
  // Show/hide sidebar
  @State() sidebar: boolean = true;

  async componentWillLoad() {
    this.template = getTemplateParam(this.template);

    this.members = await loadMembers(this.memberFilename);
    this.agencies = await loadAgencies(this.agencyFilename);
    // what agencies are available
     state.agencies = this.agencies;

    this.committees = await this.loadTemplate(this.template);

  }

  availableAgencies(committees: Array<ICommittee>) {
    // debugger;
    const usedAgencies = committees.map(committee => committee.agencies?.map(agency => agency.name)).flat()

    const availableAgencies = this.agencies.filter(agency => {
      return !usedAgencies.includes(agency.name);
    })
    return availableAgencies;
  }

  async loadTemplate(template: CouncilTemplate = CouncilTemplate.saved): Promise<Array<ICommittee>> {
    let committees: Array<ICommittee> = [];

    switch (template) {
      case CouncilTemplate.current: {
        committees = await loadCommittees(this.committeeFilename, this.members, this.agencies);
        break;
      }
      case CouncilTemplate.saved: {
        committees = getVersion();
        break;
      }
      default: { 
        // blank, but with placeholder committees
        const permanentCommittees = this.committees.filter(c => !c.editable);
        committees = await loadBlank(permanentCommittees);
      }
    }

    state.agencies = this.availableAgencies(committees);
    state.committees = committees;

    return committees;
  }

  @Listen('templateSelected')
  async templateSelected(evt) {
    this.committees = await this.loadTemplate(evt.detail);
  }

  @Listen('calciteRadioGroupChange')
  selectorChanged(evt) {
    this.selectedPieces = evt.detail;
  }

  renderSelector() {
    return (
      <calcite-radio-group
        layout="horizontal"
        appearance="solid"
        scale="l"
        width="full"
      >
        <calcite-radio-group-item value="agencies" checked="">
          Agencies
        </calcite-radio-group-item>
        <calcite-radio-group-item value="members" >
          Members
        </calcite-radio-group-item>
      </calcite-radio-group>
    );

  }

  render() {
    return (
      <Host>
        <div id="gameboard" class={`display-${this.selectedPieces} sidebar-${this.sidebar ? 'visible' : 'hidden'}`}>
          <div id="header">
            <slot name="header"></slot>
            <dc-council-share class="control">
              Share
            </dc-council-share>

            <dc-council-template class="control">
              Start Again
            </dc-council-template>
          </div>
          <div id="sidebar"
            class={{
              hidden: this.sidebar
            }}
          >
            <div id="selector">{this.renderSelector()}</div>
            <div id="pieces">
              <dc-council-member-list
                members={this.members}
              >
              </dc-council-member-list>
              <dc-council-agency-list
                agencies={state.agencies}
                class="pieces"
              >
              </dc-council-agency-list>
            </div>
          </div>
          <div id="board">
            <span id="sidebar-tab" onClick={() => this.sidebar = this.sidebar ? false : true}>
              <calcite-icon icon={this.sidebar ? 'chevronLeft' : 'chevronRight' } scale="m"></calcite-icon>
            </span>
            <dc-council-committee-list
              committees={this.committees}
            >
              <span>Committees</span>
            </dc-council-committee-list>

          </div>
          <div id="footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </Host>
    );
  }

}
