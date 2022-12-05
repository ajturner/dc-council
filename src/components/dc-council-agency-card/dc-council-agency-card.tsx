import { Component, Host, h, Prop, Event, EventEmitter } from '@stencil/core';
import { calculateBudget } from '../../utils/data';
import state from '../../utils/state';
import { CardAction, IAgency } from '../../utils/types';

@Component({
  tag: 'dc-council-agency-card',
  styleUrl: 'dc-council-agency-card.css',
  shadow: true,
})
export class DcCouncilAgencyCard {

  @Prop() agency;
  // Should this member be removable (show action)
  @Prop() action:CardAction = null;

  @Event() agencyRemove: EventEmitter<IAgency>;

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
        draggable={state.editable}
        onDragStart={this.dragStart.bind(this)}      
        onDragEnd={this.dragEnd.bind(this)}
        class={this.agency.type}
      >
          <slot></slot>
          <dc-council-card>
            <span slot="action">
              {this.renderAction(this.action)}
            </span>          
            <span slot="title" class="title">
               <span id="name">{this.agency?.name}</span>
            </span>

            <div slot="details" class="details">
              <span id="type">{this.agency.type} </span>
              <span id="budget">{calculateBudget([this.agency])}m budget</span>
              {this.renderInfoPanel(this.agency)}
            </div>
            
          </dc-council-card>
      </Host>
    );
  }

  private renderAction(action:CardAction) {
    if(action === CardAction.remove) {
      return <calcite-icon icon="x" scale="m" aria-hidden="true"
        onClick={(_evt) => this.agencyRemove.emit(this.agency)}
      ></calcite-icon>;
    }
  }

  private renderInfoPanel(agency: IAgency) {
    return <dc-council-info-panel>
      <span slot="title">About</span>
      <div slot="header">About {agency.name}</div>
      <p slot="content">
        <ul>
              <li><span id="cluster">Cluster: {this.agency.cluster}</span></li>
              <li><span id="type">{this.agency.type} </span></li>
              <li><span id="budget">{calculateBudget([this.agency])}m budget</span></li>
              <li><a id="link" href={this.agency.link} target="_new">Website</a></li>
        </ul>
      </p>
    </dc-council-info-panel>;
  }
}

