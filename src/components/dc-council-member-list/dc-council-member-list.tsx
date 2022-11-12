import { Component, Host, h, Prop, Listen, Element, Event, EventEmitter } from '@stencil/core';
import state from '../../utils/state';
import { CardAction, IMember } from '../../utils/types';
@Component({
  tag: 'dc-council-member-list',
  styleUrl: 'dc-council-member-list.css',
  shadow: true,
})
export class DcCouncilMemberList {
  @Element() el: HTMLElement;

  @Event() membersAdded: EventEmitter<any>;

  /**
   * Maximum number of members allowed. Null or -1 means unlimited
   */
  @Prop() max:number = null;

  /**
   * Array of people in this list
   */
  @Prop({ mutable:true, reflect: true }) members:Array<IMember> = [];
  
  /**
  * Name of position for this to show
   */
  @Prop() position:string;

  // @Watch('members')
  addMembers(newMembers:Array<IMember>, _oldMembers:Array<IMember> = []) {
    // Don't add duplicate members
    const existingMembers = this.members.map(m => m.name);
    newMembers = newMembers.filter(member => {
      return !existingMembers.includes(member.name);
    })

    // Limit size by max
    const newSize:number = this.members.length + newMembers.length;
    if(!!this.max && newSize > this.max) {
      // newMembers = newMembers.slice(0,this.max)
      
      const removeMembers = newSize - this.max;
      this.members = [
        ...this.members.slice(removeMembers,this.members.length), 
        ...newMembers
      ];
    } else {
      this.members = [...this.members, ...newMembers];
    }
  
    // Event up for other components
    this.membersAdded.emit(this.members);
  }

  @Listen('addedElement')
  addedElement(evt) {
    evt.preventDefault();
    var data = evt.dataTransfer.getData("text");
    const newMember = JSON.parse(data);
    this.addMembers([newMember]);
  }

  @Listen('memberRemove')
  removeMember(evt) {
    this.members = this.members.filter((member) => {
      return member.name !== evt.detail.name;
    })
  }

  // TODO - prevent allow agency onto members
  allowDrop(evt) {
    // evt.target.classList.add('drag-over');
    // debugger;
    // const possibleElement = JSON.parse(data);
    if(state.action === "member") {
      evt.preventDefault();
    }
  }

  render() {
    const classes = ['dropzone', `action-${state.action}`];
        // Adds prompts for adding more members
    if(this.members.length < this.max) {
      classes.push('spots-available');
    }
    return (
      <Host
        class={classes.join(' ')}
        onDrop={this.addedElement.bind(this)}
        onDragOver={this.allowDrop.bind(this)}
      >
          <span id="title">
            <slot></slot>
          </span>
          <div id="members">
          {this.members.map((member) => {
            return (
              <dc-council-member-card 
                member={member}
                action={!!this.position ? CardAction.remove : null}
              ></dc-council-member-card>
            )
          })}
          </div>
      </Host>
    );
  }

}
