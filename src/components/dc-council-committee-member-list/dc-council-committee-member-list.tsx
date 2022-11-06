import { Component, Host, h, Method, Prop } from '@stencil/core';
import { ICommitteeMembers } from '../../utils/types';

@Component({
  tag: 'dc-council-committee-member-list',
  styleUrl: 'dc-council-committee-member-list.css',
  shadow: true,
})
export class DcCouncilCommitteeMemberList {
  private chairEl:HTMLDcCouncilMemberListElement;
  private membersEl:HTMLDcCouncilMemberListElement;

  @Prop({ mutable:true, reflect: true}) members: ICommitteeMembers;

  @Method()
  public async getMembers():Promise<ICommitteeMembers> {
    return {
      chair: this.chairEl.members,
      members: this.membersEl.members
    };
  }

  render() {
    console.log("committee-member list", this.members)
    return (
      <Host>
        <slot></slot>
        
        <dc-council-member-list
          id="chair"
          max={1}
          position="chair"
          members={this.members?.chair}
          ref={el => (this.chairEl = el as HTMLDcCouncilMemberListElement)}

        >
         Chair
        </dc-council-member-list>
        
        <dc-council-member-list
          id="members"
          position="members"
          max={4}
          members={this.members?.members}
          ref={el => (this.membersEl = el as HTMLDcCouncilMemberListElement)}
        >
          Members
        </dc-council-member-list>
      </Host>
    );
  }
}
