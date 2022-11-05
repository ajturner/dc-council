import { Component, Host, h, Prop } from '@stencil/core';
import "@esri/calcite-components/dist/calcite/calcite.css";

@Component({
  tag: 'dc-council-member-card',
  styleUrl: 'dc-council-member-card.css',
  shadow: true,
})
export class DcCouncilMemberCard {

  @Prop() member;

  dragStart(ev) {
    console.log("dragStart");
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
    return (
      <Host>
        <slot></slot>
        <calcite-card 
          draggable="true"
          onDragStart={this.dragStart.bind(this)}
        >
          <span slot="title" class="title">
          <calcite-icon icon="user" scale="m" aria-hidden="true"></calcite-icon>
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