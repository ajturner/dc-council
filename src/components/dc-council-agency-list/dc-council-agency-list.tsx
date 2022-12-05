import { Component, Host, h, Listen, Prop, Event, EventEmitter, Method } from '@stencil/core';
import state from '../../utils/state';
import { CardAction, IAgency } from '../../utils/types';

@Component({
  tag: 'dc-council-agency-list',
  styleUrl: 'dc-council-agency-list.css',
  shadow: true,
})
export class DcCouncilAgencyList {
  
  @Prop({ mutable:true, reflect: true }) agencies = [];
  @Prop() display:string = 'major';

  @Prop() editable:boolean = true;

  @Event() agenciesChanged: EventEmitter<any>;

  @Method()
  public async addAgency(newAgencies: Array<IAgency>) {
    // Don't add duplicate members
    const existingAgencies = this.agencies.map(m => m.name);
    newAgencies = newAgencies.filter(agency => {
      return !existingAgencies.includes(agency.name);
    })

    this.agencies = [...this.agencies, ...newAgencies]
    this.agenciesChanged.emit( newAgencies );
  }

  @Listen('agencyRemove')
  onAgencyRemove(evt) {
    // add this agency to the global availability
    state.agencies = [...state.agencies, evt.detail];
    // Now remove it from this commmittee
    this.removeAgency(evt.detail);
  }

  @Method()
  public async removeAgency(removedAgency:IAgency) {
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
    if(!!state.draggable) {
      // remove the dragged element
      evt.target.removeAgency(state.draggable);//removeChild(evt.target);

    }

    state.draggable = null;

  }

  render() {
    return (
      <Host
          class={`dropzone spots-available action-${state.action} display-${this.display}`}
          onDrop={this.addedElement.bind(this)}
          onDragOver={this.allowDrop.bind(this)}
          onDragEnd={this.dragEnd.bind(this)}
      >
        <span id="title">
          <slot></slot>
        </span>

        <div id="agencies">
        {this.agencies.map((agency) => {
          return (
            <dc-council-agency-card 
              agency={agency}
              action={this.editable ? CardAction.remove : null}
              class={`display-${this.display}`}
            ></dc-council-agency-card>
          )
        })}
        </div>
      </Host>
    );
  }
}
