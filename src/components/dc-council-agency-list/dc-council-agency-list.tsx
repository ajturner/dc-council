import { Component, Host, h, Listen, Prop, Event, EventEmitter } from '@stencil/core';
import state from '../../utils/state';
import { IAgency } from '../../utils/types';

@Component({
  tag: 'dc-council-agency-list',
  styleUrl: 'dc-council-agency-list.css',
  shadow: true,
})
export class DcCouncilAgencyList {
  @Prop() agencies = [];
  @Event() agenciesAdded: EventEmitter<any>;

  addAgency(newAgencies: Array<IAgency>) {
    // Don't add duplicate members
    const existingAgencies = this.agencies.map(m => m.name);
    newAgencies = newAgencies.filter(agency => {
      return !existingAgencies.includes(agency.name);
    })

    this.agencies = [...this.agencies, ...newAgencies]
  }

  @Listen('addedElement')
  addedElement(evt) {
    evt.preventDefault();
    var data = evt.dataTransfer.getData("text");
    const newAgency = JSON.parse(data);
    this.addAgency([ newAgency ]);

    this.agenciesAdded.emit([ newAgency ]);
  }

  allowDrop(evt) {
    if(state.action === "agency") {
      evt.preventDefault();
    }
  }

  render() {
    return (
      <Host
        class={`spots-available action-${state.action}`}
      >
        <span id="title">
          <slot></slot>
        </span>

        <div 
          class="dropzone"
          onDrop={this.addedElement.bind(this)}
          onDragOver={this.allowDrop.bind(this)}
        >
        {this.agencies.map((agency) => {
          return (
            <dc-council-agency-card agency={agency}></dc-council-agency-card>
          )
        })}
        </div>
      </Host>
    );
  }
}
