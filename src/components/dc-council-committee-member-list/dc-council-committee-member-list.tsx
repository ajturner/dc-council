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
      </Host>
    );
  }

}
