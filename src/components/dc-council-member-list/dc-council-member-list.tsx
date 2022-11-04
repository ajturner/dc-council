import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'dc-council-member-list',
  styleUrl: 'dc-council-member-list.css',
  scoped: true,
})
export class DcCouncilMemberList {

  @Prop() members = [];
  
  render() {
    return (
      <Host>
        <slot></slot>
        <div id="members" class="container">
          {this.members.map((member) => {
            return (
              <dc-council-member-card member={member}></dc-council-member-card>
            )
          })}
        </div>        
      </Host>
    );
  }

}
