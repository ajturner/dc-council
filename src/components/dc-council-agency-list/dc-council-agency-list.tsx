import { Component, Host, h, Listen, Prop, Event, EventEmitter, Method } from '@stencil/core';
import state from '../../utils/state';
import { IAgency } from '../../utils/types';

@Component({
  tag: 'dc-council-agency-list',
  styleUrl: 'dc-council-agency-list.css',
  shadow: true,
})
export class DcCouncilAgencyList {
  @Prop() agencies = [];
  @Event() agenciesChanged: EventEmitter<any>;

  @Method()
  addAgency(newAgencies: Array<IAgency>) {
    // Don't add duplicate members
    const existingAgencies = this.agencies.map(m => m.name);
    newAgencies = newAgencies.filter(agency => {
      return !existingAgencies.includes(agency.name);
    })

    this.agencies = [...this.agencies, ...newAgencies]
    this.agenciesChanged.emit( newAgencies );
  }

  @Method()
  public async removeAgency(removedAgency:IAgency) {
    // debugger;
    this.agencies = this.agencies.filter((agency) => {
      return agency.name !== removedAgency.name;
    })
    // notify cards for updating summary stats
    this.agenciesChanged.emit( );

  }
  @Listen('addedElement')
  addedElement(evt) {
    console.log(`drop: effectAllowed = ${evt.dataTransfer.effectAllowed}`);

    evt.preventDefault();
    // debugger
    var data = evt.dataTransfer.getData("text");
    const newAgency = JSON.parse(data);
    this.addAgency([ newAgency ]);


    // Storing so we can remove later
    state.draggable = newAgency;
  }

  allowDrop(evt) {
    if(state.action === "agency") {
      evt.preventDefault();
    }
  }
  dragEnd(evt) {
    evt.preventDefault();
    // debugger;
    if(!!state.draggable) {
      // remove the dragged element
      evt.target.removeAgency(state.draggable);//removeChild(evt.target);

    }

    state.draggable = null;

  }

  render() {
    return (
      <Host
        class={`dropzone spots-available action-${state.action}`}
        
          onDrop={this.addedElement.bind(this)}
          onDragOver={this.allowDrop.bind(this)}
          onDragEnd={this.dragEnd.bind(this)}
      >
        <span id="title">
          <slot></slot>
        </span>

        <div>
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
