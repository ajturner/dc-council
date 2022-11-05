import { Component, Host, h, Prop, Watch, Listen, Element } from '@stencil/core';
import { IMember } from '../../utils/types';
@Component({
  tag: 'dc-council-member-list',
  styleUrl: 'dc-council-member-list.css',
  shadow: true,
})
export class DcCouncilMemberList {
  @Element() el: HTMLElement;

  /**
   * Maximum number of members allowed. Null or -1 means unlimited
   */
  @Prop() max:number = null;

  /**
   * Array of people in this list
   */
  @Prop({ mutable:true, reflect: true }) members:Array<IMember> = [];
  
  @Prop() position:string;

  @Watch('members')
  membersUpdated(newMembers:Array<IMember>, _oldMembers:Array<IMember> = []) {
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
    // debugger;
    console.log("dc-council-member-list addedElement", {
      members: this.members,
      evt,
      card: evt.detail.item,
      to: evt.detail.to,
    })
    
    // TODO: generalize for other dropzones
    const newMembers = evt.detail.map(card => {
      return(card.member)
    });
    this.membersUpdated(newMembers);
  }

  render() {
    console.log("member-list render", this.members)
    return (
      <Host>
          <span id="title">
            <slot></slot>
          </span>
          <dc-council-dropzone
            group="member"
            position={this.position}
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
