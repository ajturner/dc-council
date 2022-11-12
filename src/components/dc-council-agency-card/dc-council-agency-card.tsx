import { Component, Host, h, Prop } from '@stencil/core';
import { calculateBudget } from '../../utils/data';
import state from '../../utils/state';

@Component({
  tag: 'dc-council-agency-card',
  styleUrl: 'dc-council-agency-card.css',
  shadow: true,
})
export class DcCouncilAgencyCard {

  @Prop() agency;
  dragEnd(_ev) {
    state.action = "";
  }
  dragStart(ev) {
    state.action = "agency";

    // Change the source element's background color
    // to show that drag has started
    ev.currentTarget.classList.add("dragging");
    // Clear the drag data cache (for all formats/types)
    ev.dataTransfer.clearData();
    // Set the drag's format and data.
    // Use the event target's id for the data
    ev.dataTransfer.setData("text/plain", JSON.stringify(this.agency));
    ev.dataTransfer.effectAllowed = "move";

  }

  render() {
    return (
      <Host
        draggable="true" 
        onDragStart={this.dragStart.bind(this)}      
        onDragEnd={this.dragEnd.bind(this)}      
      >
          <slot></slot>
          <dc-council-card>
            <span slot="title" class="title">
               <span id="name">{this.agency?.name}</span>
            </span>

            <div slot="details" class="details">
              <span id="cluster">Cluster: {this.agency.cluster}</span>
              <span id="budget">{calculateBudget([this.agency])}m budget</span>
              <a id="link" href={this.agency.link} target="_new">Website</a>
            </div>
            
          </dc-council-card>
      </Host>
    );
  }
}
