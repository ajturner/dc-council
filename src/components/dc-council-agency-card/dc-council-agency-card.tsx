import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'dc-council-agency-card',
  styleUrl: 'dc-council-agency-card.css',
  shadow: true,
})
export class DcCouncilAgencyCard {

  @Prop() agency;

  dragStart(ev) {
    console.log("dragStart");
    // Change the source element's background color
    // to show that drag has started
    ev.currentTarget.classList.add("dragging");
    // Clear the drag data cache (for all formats/types)
    ev.dataTransfer.clearData();
    // Set the drag's format and data.
    // Use the event target's id for the data
    ev.dataTransfer.setData("text/plain", JSON.stringify(this.agency));

  }

  render() {
    return (
      <Host
        draggable="true" 
        onDragStart={this.dragStart.bind(this)}      
      >
          <slot></slot>
          <calcite-card draggable="true">
            <span slot="title" class="title">
              <calcite-icon icon="organization" scale="m" aria-hidden="true"></calcite-icon>
              {this.agency?.name}
            </span>

            <ul class="details subtitle">
              <li>Cluster: {this.agency.cluster}</li>
              <li>Budget: {this.agency.budget}</li>
              <li><a href={this.agency.link} target="_new">Website</a></li>
            </ul>
            
          </calcite-card>
      </Host>
    );
  }
}
