import { Component, Host, h, Prop, Listen } from '@stencil/core';

@Component({
  tag: 'dc-council-committee-list',
  styleUrl: 'dc-council-committee-list.css',
  scoped: true,
})
export class DcCouncilCommitteeList {

  @Prop({ mutable: true, reflect: true }) committees = [];
  
  @Listen('addCommittee')
  addCommittee(_evt) {
    console.log("addCommittee");
    this.committees = [...this.committees, {
      name: "New Committee"
    }]
  }
  
  // TODO: Replace Agencies to available
  @Listen('removeCommittee')
  removeCommittee(evt) {
    console.log("removeCommittee", evt.detail);
    this.committees = this.committees.filter(c => {
      console.log("compare", [c, evt.detail])
      return c.name !== evt.detail.name
    })
  }

  render() {
    return (
      <Host>
        <div class="head">
          <slot></slot>
          <dc-council-committee-placeholder></dc-council-committee-placeholder>
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
