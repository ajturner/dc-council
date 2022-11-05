import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'dc-council-committee-member-list',
  styleUrl: 'dc-council-committee-member-list.css',
  shadow: true,
})
export class DcCouncilCommitteeMemberList {

  // @Method()
  // async getMembers {

  // }

  render() {
    return (
      <Host>
        <slot></slot>
        
        <dc-council-member-list
          id="chair"
          max={1}
          position="chair"
        >
         Chair
        </dc-council-member-list>
        
        <dc-council-member-list
          id="members"
          position="members"
        >
          Members
        </dc-council-member-list>
      </Host>
    );
  }
}
