import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'dc-council-committee-member-list',
  styleUrl: 'dc-council-committee-member-list.css',
  shadow: true,
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
