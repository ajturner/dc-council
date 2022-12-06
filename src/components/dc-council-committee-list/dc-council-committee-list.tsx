import { Component, Host, h, Prop, Listen } from '@stencil/core';
import { createCommittee } from '../../utils/data';
import state from '../../utils/state';
import { ICommittee } from '../../utils/types';

@Component({
  tag: 'dc-council-committee-list',
  styleUrl: 'dc-council-committee-list.css',
  shadow: true,
})
export class DcCouncilCommitteeList {

  @Prop({ mutable: true, reflect: true }) committees:Array<ICommittee> = [];
  
  @Listen('addCommittee')
  addCommittee(_evt) {
    const newCommittee = createCommittee();

    this.committees = [...this.committees, newCommittee];

    state.committees = [...this.committees];

  }

  // TODO: Replace Agencies to available
  @Listen('removeCommittee')
  removeCommittee(evt) {
    this.committees = this.committees.filter(c => {
      return c.id !== evt.detail.id
    })

    // New copies
    state.committees = [...this.committees];
  }

  @Listen('committeeUpdated')
  committeeUpdated(_evt) {
    state.committees = [...this.committees];
    state.saved = false;
  }

  render() {
    return (
      <Host>
        <div class="head">
          <span id="title"><slot></slot></span>

        </div>
        <div id="committees" class="container">
          {this.committees.map((committee) => {
            return (
              <dc-council-committee-card 
                class="committee-card"
                id={`committee-${committee.id}`}
                committee={committee}
              ></dc-council-committee-card>
            )
          })}
          {state.editable ? this.renderNewCommittee() : null}
        </div> 
      </Host>
    );
  }


  private renderNewCommittee() {
    return <dc-council-committee-placeholder
      id="newCommitteeButton"
    ></dc-council-committee-placeholder>;
  }
}
