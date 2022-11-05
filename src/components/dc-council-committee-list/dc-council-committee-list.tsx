import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'dc-council-committee-list',
  styleUrl: 'dc-council-committee-list.css',
  scoped: true,
})
export class DcCouncilCommitteeList {

  @Prop() committees = [];
  
  render() {
    return (
      <Host>
        <slot></slot>
        {/* <dc-council-committee-placeholder></dc-council-committee-placeholder> */}
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
