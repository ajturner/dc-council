import { Component, Host, h, Listen, Prop, Event, EventEmitter, State, Element } from '@stencil/core';
import { calculateBudget } from '../../utils/data';
import { IAgency, ICommittee, IMember } from '../../utils/types';

@Component({
  tag: 'dc-council-committee-card',
  styleUrl: 'dc-council-committee-card.css',
  scoped: true,
})
export class DcCouncilCommitteeCard {
  @Element() el: HTMLElement;

  @Prop() committee: ICommittee;
  
  private membersEl:HTMLDcCouncilCommitteeMemberListElement;
  private agenciesEl:HTMLDcCouncilAgencyListElement;
  
  @Event() removeCommittee: EventEmitter<any>;
  @Event() committeeUpdated: EventEmitter<ICommittee>;

  // Stores from committee.members for re-render
  @State() members: Array<IMember>;
  @State() agencies: Array<IAgency>;

  componentWillLoad() {
    // TODO: Figure out if this can be removed + still update render with nested children in committee.members.members
    this.members = this.committee.members?.members;
    this.agencies = this.committee.agencies;
  }

  @Listen('membersChanged')
  async membersChanged(_evt) {
    this.committee.members = await this.membersEl.getMembers();
    // State for re-render
    this.members = this.committee.members?.members;
    this.committeeUpdated.emit( this.committee );
  }
  @Listen('agenciesChanged')
  async agenciesChanged(_evt) {
    this.committee.agencies = this.agenciesEl.agencies;
    
    // State for re-render
    this.agencies = this.committee.agencies;
    
    this.committeeUpdated.emit( this.committee );
  } 

  deleteButton() {
    this.removeCommittee.emit(this.committee);
  }

  renderStats() {
    return (
      <ul id="stats">
        <li>{calculateBudget(this.committee.agencies)}m budget</li>
        <li>{this.agencies?.length} agencies</li>
        <li>{this.committee.members?.members?.length + this.committee.members?.chair?.length} members</li>
      </ul>
    )
  }
  editMode(editing:boolean = true) {
    if(editing) {
      this.el.classList.add("editing");
    } else {
      this.el.classList.remove("editing");
    }
  }

  render() {
    return (
      <Host>
        <slot></slot>
        <calcite-card>
          <span slot="title" id="title"
            onClick={this.editMode.bind(this)}
          >
          
          
          <span id="titleView">{this.committee?.name}</span>
          {/* <calcite-icon icon="group" scale="m" aria-hidden="true"></calcite-icon> */}
            <calcite-inline-editable
              id="titleEdit"
              scale="l"
              intl-cancel-editing="Cancelar"
              intl-enable-editing="Haga clic para editar"
              intl-confirm-changes="Guardar"
              // editing-enabled="true"
            >
              <calcite-input-text
                
                scale="l"
                status="idle"
                alignment="start"
                prefix-text=""
                suffix-text=""
                value={this.committee?.name}
                placeholder="Committee Name"
              ></calcite-input-text>
          </calcite-inline-editable>
          {this.renderDelete()}
        </span>
        <span slot="subtitle">
          {this.renderStats()}
        <dc-council-committee-member-list
          members={this.committee.members}
          ref={el => (this.membersEl = el as HTMLDcCouncilCommitteeMemberListElement)}
        ></dc-council-committee-member-list>

        
        <dc-council-agency-list
          agencies={this.committee.agencies}
          ref={el => (this.agenciesEl = el as HTMLDcCouncilAgencyListElement)}
        >
          Agencies
        </dc-council-agency-list>          
        </span>
        {/* <ul class="details subtitle">
          {Object.keys(this.committee).map(key => {
            return <li>{key}: {this.committee[key]}</li>
          })}
          <li><a href={this.committee.link} target="_new">Website</a></li>
        </ul> */}
        <div slot="footer-trailing">
          
        </div>        
        </calcite-card>
      </Host>
    );
  }


  private renderDelete() {
    return <calcite-button
      id="card-icon-test-6"
      scale="s"
      appearance="transparent"
      color="red"
      icon-start="x"
      alignment="center"
      type="button"
      width="auto"
      onClick={this.deleteButton.bind(this)}
    >Delete Committee</calcite-button>;
  }
}
