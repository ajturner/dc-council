import { Component, Host, h, State, Prop, Listen } from '@stencil/core';
import { loadAgencies, loadBlank, loadCommittees, loadMembers } from '../../utils/data';
import state, { getTemplate, getTemplateParam, getVersion } from '../../utils/state';
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

  /**
   * restart - showing template
   */
  @Prop({ mutable: true, reflect: true }) restart: boolean = false; 

  @State() agencies = [];
  @Prop({mutable: true, reflect: true}) committees: Array<ICommittee> = [];
  @State() members: Array<IMember> = [];
  
  // Show/hide sidebar
  @State() sidebar: boolean = true;

  async componentWillLoad() {
    this.template = getTemplate(this.template);

    this.members = await loadMembers(this.memberFilename);
    this.agencies = await loadAgencies(this.agencyFilename);
    // what agencies are available
     state.agencies = this.agencies;

    this.committees = await this.loadTemplate(this.template);

    if(!getTemplateParam()) {
      this.restart = true;
    }

  }

  availableAgencies(committees: Array<ICommittee>) {
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
        committees = getVersion(this.members, this.agencies, this.committees);
        break;
      }
      default: { 
        // blank, but with placeholder committees
        let permanentCommittees = this.committees.filter(c => !c.editable);
        committees = await loadBlank(permanentCommittees);
      }
    }

    state.agencies = this.availableAgencies(committees);
    state.committees = committees;

    return committees;
  }

  @Listen('templateSelected')
  async templateSelected(evt) {
    const committees = await this.loadTemplate(evt.detail);
    this.committees = [...committees];
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
            <dc-council-info-panel>
              <span slot="title">How to use this Tool</span>
              <div slot="header">How to Use this Tool</div>
              <p slot="content">
                <ol>
                  <li>Create/rename any desired committees.</li>
                  <li>Drag and drop a Councilmember into the chair position, and then others into the committee member positions.</li>
                  <li>Drag and drop the agencies this committee should be in charge of oversight.</li>
                  <li>When you're ready, click "Share" to post to social media or send the link!</li>
                </ol>
              </p>
            </dc-council-info-panel>
            

            <dc-council-template 
              open={this.restart}
              class="control"
              id="reset">
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
            <span id="sidebar-tab" onClick={() => this.sidebar = this.sidebar ? false : true}>
              <calcite-icon icon={this.sidebar ? 'chevronLeft' : 'chevronRight' } scale="m"></calcite-icon>
            </span>

          </div>
          <div id="board">
            <dc-council-committee-list
              committees={this.committees}
            >
              <span id="boardHeader">
                <span>Committees</span>
                <dc-council-share class="control">
                  Share
                </dc-council-share>
              </span>
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
