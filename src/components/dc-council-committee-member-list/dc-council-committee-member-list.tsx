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

  /**
   * Determines if Members list is editable
   * used mostly for "Committee of the Whole"
   */  
  @Prop() editable:boolean = true;

  @Method()
  public async getMembers():Promise<ICommitteeMembers> {
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
          editable={this.editable}
          members={this.members?.chair}
          ref={el => (this.chairEl = el as HTMLDcCouncilMemberListElement)}
        >
         Chair
        </dc-council-member-list>
        
        <dc-council-member-list
          id="members"
          position="members"
          editable={this.editable}
          members={this.members?.members}
          ref={el => (this.membersEl = el as HTMLDcCouncilMemberListElement)}
        >
          Members
        </dc-council-member-list>
      </Host>
    );
  }
}
