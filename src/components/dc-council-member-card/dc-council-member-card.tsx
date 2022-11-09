import { Component, Host, h, Prop, getAssetPath } from '@stencil/core';
import "@esri/calcite-components/dist/calcite/calcite.css";
import state from '../../utils/state';

@Component({
  tag: 'dc-council-member-card',
  styleUrl: 'dc-council-member-card.css',
  shadow: true,
  assetsDirs: ['assets'],
})
export class DcCouncilMemberCard {

  @Prop() member;

  dragEnd(_ev) {
    state.action = "";
  }
  dragStart(ev) {
    console.log("dragStart");
    state.action = "member";

    // Change the source element's background color
    // to show that drag has started
    ev.currentTarget.classList.add("dragging");
    // Clear the drag data cache (for all formats/types)
    ev.dataTransfer.clearData();
    // Set the drag's format and data.
    // Use the event target's id for the data
    ev.dataTransfer.setData("text/plain", JSON.stringify(this.member));

  }
  render() {
    const imageSrc = getAssetPath(`../assets/2022/photos/${this.member.photo}`);

    return (
      <Host
        draggable="true"
        onDragStart={this.dragStart.bind(this)}
        onDragEnd={this.dragEnd.bind(this)}
      >
        <slot></slot>
        <calcite-card>
          <span slot="title" class="title">
            {this.member.photo 
              ? <img src={imageSrc} alt={`Photograph of ${this.member.name}`} />
              : null}
            {this.member?.name}
          </span>
            
            <ul class="details subtitle">
            {Object.keys(this.member).map(key => {
              return <li>{key}: {this.member[key]}</li>
            })}
            <li><a href={this.member.link} target="_new">Website</a></li>
          </ul>
        </calcite-card>
      </Host>
    );
  }
}