import { Component, Host, h, Prop, Watch, Listen } from '@stencil/core';
import { IMember } from '../../utils/types';
@Component({
  tag: 'dc-council-member-list',
  styleUrl: 'dc-council-member-list.css',
  shadow: true,
})
export class DcCouncilMemberList {

  /**
   * Maximum number of members allowed. Null or -1 means unlimited
   */
  @Prop() max:number = null;

  /**
   * Array of people in this list
   */
  @Prop({ mutable:true, reflect: true }) members:Array<IMember> = [];
  
  @Watch('members')
  membersUpdated(newMembers:Array<IMember>, _oldMembers:Array<IMember>) {
    debugger;
    console.log("membersUpdated", newMembers)
    const newSize:number = this.members.length + newMembers.length;
    if(newSize > this.max) {
      this.members = newMembers.slice(0,this.max)
    } else {
      this.members = newMembers;
    }
  }

  @Listen('addedElement')
  addedElement(evt) {
    console.log("dc-council-member-list addedElement", {
      evt,
      card: evt.detail.item,
      
    })

  }

  render() {
    console.log("member-list render", this.members)
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
