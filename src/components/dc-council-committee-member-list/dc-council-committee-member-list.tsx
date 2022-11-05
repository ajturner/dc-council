import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'dc-council-committee-member-list',
  styleUrl: 'dc-council-committee-member-list.css',
  scoped: true,
})
export class DcCouncilCommitteeMemberList {

  render() {
    return (
      <Host>
        <slot></slot>
        <h3>Chair</h3>
        <dc-council-member-list
          id="chair"
          max={1}
        ></dc-council-member-list>
        <h3>Members</h3>
        <dc-council-member-list
          id="members"
        ></dc-council-member-list>
      </Host>
    );
  }

}
