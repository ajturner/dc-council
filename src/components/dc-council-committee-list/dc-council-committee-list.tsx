import { Component, Host, h, Prop, Listen } from '@stencil/core';

@Component({
  tag: 'dc-council-committee-list',
  styleUrl: 'dc-council-committee-list.css',
  shadow: true,
})
export class DcCouncilCommitteeList {

  @Prop({ mutable: true, reflect: true }) committees = [];
  
  @Listen('addCommittee')
  addCommittee(_evt) {
    console.log("addCommittee");
    this.committees = [...this.committees, {
      id: Math.floor(Math.random() * 1000)
    }]
  }

  // TODO: Replace Agencies to available
  @Listen('removeCommittee')
  removeCommittee(evt) {
    this.committees = this.committees.filter(c => {
      return c.id !== evt.detail.id
    })
  }

  render() {
    return (
      <Host>
        <div class="head">
          <span id="title"><slot></slot></span>
          <dc-council-committee-placeholder
            id="newCommitteeButton"
          ></dc-council-committee-placeholder>
        </div>
        <div id="committees" class="container">
          {this.committees.map((committee) => {
            return (
              <dc-council-committee-card committee={committee}></dc-council-committee-card>
            )
          })}          
        </div> 
      </Host>
    );
  }

}
