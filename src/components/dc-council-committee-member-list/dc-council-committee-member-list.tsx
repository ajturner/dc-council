import { Component, Host, h, Method, Listen } from '@stencil/core';

@Component({
  tag: 'dc-council-committee-member-list',
  styleUrl: 'dc-council-committee-member-list.css',
  shadow: true,
})
export class DcCouncilCommitteeMemberList {
  private chairEl:HTMLDcCouncilMemberListElement;
  private membersEl:HTMLDcCouncilMemberListElement;

  @Method()
  public async getMembers() {
    return {
      chair: this.chairEl.members,
      members: this.membersEl.members
    };
  }

  render() {
    return (
      <Host>
        <slot></slot>
        
        <dc-council-member-list
          id="chair"
          max={1}
          position="chair"
          ref={el => (this.chairEl = el as HTMLDcCouncilMemberListElement)}

        >
         Chair
        </dc-council-member-list>
        
        <dc-council-member-list
          id="members"
          position="members"
          max={4}
          ref={el => (this.membersEl = el as HTMLDcCouncilMemberListElement)}
        >
          Members
        </dc-council-member-list>
      </Host>
    );
  }
}
