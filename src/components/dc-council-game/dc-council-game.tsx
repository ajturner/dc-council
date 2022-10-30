import { Component, Host, h, State } from '@stencil/core';

@Component({
  tag: 'dc-council-game',
  styleUrl: 'dc-council-game.css',
  shadow: true,
})
export class DcCouncilGame {

  @State() committees = [{name:'committee A'}];
  @State() agencies = [{name:'agency A'}];
  @State() members = [{name:'member A'}];

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
