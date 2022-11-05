import { Component, Host, h, State, Prop } from '@stencil/core';
import { loadAgencies, loadCommittees, loadMembers } from '../../utils/data';
import { IMember } from '../../utils/types';

@Component({
  tag: 'dc-council-game',
  styleUrl: 'dc-council-game.css',
  scoped: true,
})
export class DcCouncilGame {

  /**
   * URL to Agency spreadsheet
   */
  @Prop() agencyFilename:string = "assets/2022/agencies.csv";
  @Prop() committeeFilename:string = "assets/2022/committees.csv";
  @Prop() memberFilename:string = "assets/2022/members.csv";

  @State() agencies = [];
  @State() committees = [{name:'committee A'}];
  @State() members:Array<IMember> = [];

  async componentWillLoad() {
    this.agencies = await loadAgencies(this.agencyFilename);
    this.committees = await loadCommittees(this.committeeFilename);
    this.members = await loadMembers(this.memberFilename);
  }




  render() {
    return (
      <Host>
        
        <div id="gameboard">
          <div id="header">
            <slot name="header"></slot>
          </div>
          <dc-council-agency-list
            agencies={this.agencies}
            >
              <h2>Agencies</h2>
            </dc-council-agency-list>
          
          <dc-council-member-list
            members={this.members}
            >
            <h2>DC Council Members</h2>
          </dc-council-member-list>
          <dc-council-committee-list 
            committees={this.committees}
            >
            <h2>Committees</h2>
          </dc-council-committee-list>
          <div id="footer">
            <slot name="footer"></slot>
          </div>          
        </div>  
      </Host>
    );
  }

}
