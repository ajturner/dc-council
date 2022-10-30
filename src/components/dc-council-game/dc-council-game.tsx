import { Component, Host, h, State, Prop } from '@stencil/core';
import { loadAgencies, loadCommittees, loadMembers } from '../../utils/data';

@Component({
  tag: 'dc-council-game',
  styleUrl: 'dc-council-game.css',
  shadow: true,
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
  @State() members = [{name:'member A'}];

  async componentWillLoad() {
    this.agencies = await loadAgencies(this.agencyFilename);
    this.committees = await loadCommittees(this.committeeFilename);
    this.members = await loadMembers(this.memberFilename);
  }

  render() {
    return (
      <Host>
        <slot></slot>
        {this.agencies.map((agency) => {
          return (
            <dc-council-agency-card agency={agency}></dc-council-agency-card>
          )
        })}
        {this.members.map((member) => {
          return (
            <dc-council-member-card member={member}></dc-council-member-card>
          )
        })}
        {this.committees.map((committee) => {
          return (
            <dc-council-committee-card committee={committee}></dc-council-committee-card>
          )
        })}
      </Host>
    );
  }

}
