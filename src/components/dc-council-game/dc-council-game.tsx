import { Component, Host, h, State, Prop, Listen } from '@stencil/core';
import { loadAgencies, loadCommittees, loadMembers } from '../../utils/data';
import state, { getBookmark, setBookmark } from '../../utils/state';
import { ICommittee, IMember } from '../../utils/types';

@Component({
  tag: 'dc-council-game',
  styleUrl: 'dc-council-game.css',
  scoped: true,
})
export class DcCouncilGame {

  @Prop({ mutable:true, reflect: true }) template:"current" | "blank" | "saved" = "saved";

  /**
   * URL to Agency spreadsheet
   */
  @Prop() agencyFilename:string = "assets/2022/agencies.csv";
  @Prop() committeeFilename:string = "assets/2022/committees.csv";
  @Prop() memberFilename:string = "assets/2022/members.csv";
  
  @Prop({ mutable:true, reflect: true }) selectedPieces:string = "agencies";

  @State() agencies = [];
  @State() committees:Array<ICommittee> = [];
  @State() members:Array<IMember> = [];

  async componentWillLoad() {
    this.members = await loadMembers(this.memberFilename);
    this.agencies = await loadAgencies(this.agencyFilename);

    if(this.template === "current") {
      this.committees = await loadCommittees(this.committeeFilename);  
    } else if (this.template === "saved") {
      this.committees = getBookmark();
    } // else blank
    state.committees = this.committees;
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

  saveButtonClicked() {
    setBookmark(state.committees);
    // debugger
  }

  renderSaveButton() {
      return(<calcite-button
          alignment="start"
          appearance="solid"
          color="blue"
          icon-start="plus"
          scale="m"
          onClick={this.saveButtonClicked.bind(this)}
        >
          Share
        </calcite-button>
      )
  }
  render() {
    return (
      <Host>
        
        <div id="gameboard" class={`display-${this.selectedPieces}`}>
          <div id="header">
            <slot name="header"></slot>
            {this.renderSaveButton()}
          </div>
          <div id="pieces">
            <div id="selector">{this.renderSelector()}</div>
            <dc-council-member-list
              members={this.members}
              >
            </dc-council-member-list>
                      <dc-council-agency-list
            agencies={this.agencies}
            class="pieces"
            >
            </dc-council-agency-list>
          </div>
          <dc-council-committee-list 
              committees={this.committees}
              >
              Committees
          </dc-council-committee-list>          
          <div id="footer">
            <slot name="footer"></slot>
          </div>          
        </div>  
      </Host>
    );
  }

}
