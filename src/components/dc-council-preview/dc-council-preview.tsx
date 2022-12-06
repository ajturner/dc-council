import { Component, Host, h, Prop, getAssetPath } from '@stencil/core';
import { ICommittee, IMember } from '../../utils/types';

@Component({
  tag: 'dc-council-preview',
  styleUrl: 'dc-council-preview.css',
  shadow: true,
  assetsDirs: ['assets'],
})
export class DcCouncilPreview {

  @Prop() committees:ICommittee[] = []

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

    const chair = committee.members.chair[0];
    // debugger;

    return <div class="committee">
      {!!chair ? this.renderMember(chair, committee) : null}
      
      
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
