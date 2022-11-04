import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'dc-council-member-list',
  styleUrl: 'dc-council-member-list.css',
  shadow: true,
})
export class DcCouncilMemberList {

  @Prop() members = [];
  
  render() {
    return (
      <Host>
        <slot></slot>
          <dc-council-dropzone
            group="member"
            class="container">
          {this.members.map((member) => {
            return (
              <dc-council-member-card member={member}></dc-council-member-card>
            )
          })}
        </dc-council-dropzone>
          
      </Host>
    );
  }

}
