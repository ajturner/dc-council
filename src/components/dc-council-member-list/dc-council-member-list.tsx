import { Component, Host, h, Prop, Watch, Listen, Element, Event, EventEmitter } from '@stencil/core';
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
    
    console.log("membersUpdated", [this.position, newMembers])
    // debugger;
    const newSize:number = this.members.length + newMembers.length;
    if(!!this.max && newSize > this.max) {
      this.members = newMembers.slice(0,this.max)
    } else {
      this.members = [...this.members, ...newMembers];
    }
    
    // Event up for other components
    this.membersAdded.emit(this.members);
  }

  @Listen('addedElement')
  addedElement(evt) {
    evt.preventDefault();

    // debugger;
    // console.log("dc-council-member-list addedElement", {
    //   members: this.members,
    //   evt,
    //   card: evt.detail.item,
    //   to: evt.detail.to,
    // })
    
    var data = evt.dataTransfer.getData("text");
    const newMember = JSON.parse(data);
    this.addMembers([newMember]);
  }

  allowDrop(evt) {
    evt.preventDefault();
  }

  render() {
    console.log("member-list render", this.members)
    return (
      <Host>
          <span id="title">
            <slot></slot>
          </span>
          {/* <dc-council-dropzone
            group="member"
            position={this.position}
            class="container"> */}

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
        {/* </dc-council-dropzone> */}
      </Host>
    );
  }

}
