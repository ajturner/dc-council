import { Component, Host, h, Prop, getAssetPath } from '@stencil/core';
import { calculateBudget } from '../../utils/data';
import { ICommittee, IMember } from '../../utils/types';

@Component({
  tag: 'dc-council-preview',
  styleUrl: 'dc-council-preview.css',
  shadow: true,
  assetsDirs: ['assets'],
})
export class DcCouncilPreview {

  @Prop({ mutable: true, reflect: true }) committees:ICommittee[] = []

  render() {
    return (
      <Host>
        <slot></slot>
        <div id="committees">
        {this.committees.map((committee) => {
          return this.renderPreviewCommittee(committee);
        })}
        </div>
      </Host>
    );
  }
  renderPreviewCommittee(committee:ICommittee) {

    let chair = committee.members.chair[0];
    if(!chair) {
      chair = {
        // need double "No No" because we slice off first name
        name: "No No chair selected",
        photo: "person.png"
      }
    }
    // debugger;

    return <div class="committee">
      {!!chair ? this.renderMember(chair, committee) : null}
      <span class="budget">{calculateBudget(committee.agencies)}m budget</span>
    </div>
  }
  renderMember(person: IMember, committee: ICommittee) {
    const imageSrc = getAssetPath(`../assets/2022/photos/${person?.photo}`);
    // Drop first name
    const name = person?.name.split(' ').slice(1).join(' ')
    return(
      <div class="member">
        {name}
        <img class="photo" src={imageSrc} />
        {committee.name}
      </div>
    )
  }

}
