import { Component, Host, h, Prop, Listen, Element, Event, EventEmitter } from '@stencil/core';
import state from '../../utils/state';
import { IMember } from '../../utils/types';
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
    

    // Adds prompts for adding more members
    if(this.members.length < this.max) {
      this.el.classList.add('spots-available');
    } else {
      this.el.classList.remove('spots-available');
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
    return (
      <Host
        class={`action-${state.action}`}

      >
          <span id="title">
            <slot></slot>
          </span>
          <div 
            class="dropzone"
            onDrop={this.addedElement.bind(this)}
            onDragOver={this.allowDrop.bind(this)}
          >
          {this.members.map((member) => {
            return (
              <dc-council-member-card member={member}></dc-council-member-card>
            )
          })}
          </div>
      </Host>
    );
  }

}
