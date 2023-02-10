import { Component, Host, h, Listen, Prop, Event, EventEmitter, Element, Method, State } from '@stencil/core';
import { calculateBudget } from '../../utils/data';
import state from '../../utils/state';
import { IAgency, ICommittee } from '../../utils/types';

@Component({
  tag: 'dc-council-committee-card',
  styleUrl: 'dc-council-committee-card.css',
  scoped: true,
})
export class DcCouncilCommitteeCard {
  @Element() el: HTMLElement;
  
  titleInputEl:HTMLInputElement;

  @Prop({ mutable: true, reflect: true }) committee: ICommittee;

  /**
   * Determines if Members list is editable
   * used mostly for "Committee of the Whole"
   */
  @Prop({ mutable:true, reflect: true }) editable: boolean = true;

  private membersEl:HTMLDcCouncilCommitteeMemberListElement;
  private agenciesEl:HTMLDcCouncilAgencyListElement;
  
  @Event() removeCommittee: EventEmitter<any>;
  @Event() committeeUpdated: EventEmitter<ICommittee>;

  // State for updating stats when sub-properties change (member + agency counts)
  @State() stats: {};
  // Is the title being edited?
  @State() editing: boolean = false;
  @State() agencies: IAgency[] = [];

  componentWillRender() {  
    this.editable = this.committee.editable;
    this.updateStats(this.committee);
    this.agencies = this.committee.agencies;
  }

  @Listen('membersChanged')
  async membersChanged(_evt) {
    this.committee.members = await this.membersEl.getMembers();
    this.updateStats(this.committee);
    this.committeeUpdated.emit( this.committee );
  }
  @Listen('agenciesChanged')
  async agenciesChanged(_evt) {
    this.committee.agencies = this.agenciesEl.agencies;
    this.updateStats(this.committee);
    this.committeeUpdated.emit( this.committee );
  } 

  @Method()
  public async deleteCommittee() {
    // make all agencies available to the game
    state.agencies = [...state.agencies, ...this.committee.agencies]
    this.removeCommittee.emit(this.committee);
  }

  updateStats(committee) {
    this.stats = this.renderStats(committee);
  }
  renderStats(committee) {
    return (
      <ul id="stats">
        <li>{calculateBudget(committee.agencies)}m budget</li>
        <li>{this.countAgencies()} agencies</li>
        <li>{this.countMembers()} members</li>
      </ul>
    )
  }

  private countAgencies() {
    return this.committee.agencies?.length;
  }

  private countMembers() {
    let count = this.committee.members?.members?.length + this.committee.members?.chair?.length;
    return !!count ? count : 0;
  }

  editMode() {
    if(!this.editing && this.committee.editable) {
      this.editing = true;
      this.el.classList.add("editing");
    }
  }

  @Listen('calciteInlineEditableEditConfirm')
  titleChanged(_evt) {
    
    this.committee.name = this.titleInputEl.value;
    this.el.classList.remove("editing");
    this.editing = false;

    // Council needs to be resaved;
    state.saved = false;
  }

  @Listen('addedElement')
  addedElement(evt) {
    if(state.action === "agency") {
        console.log(`drop: effectAllowed = ${evt.dataTransfer.effectAllowed}`);

      evt.preventDefault();
      // debugger
      var data = evt.dataTransfer.getData("text");
      const newAgency = JSON.parse(data);
      this.agenciesEl.addAgency([ newAgency ]);
      
      // Storing so we can remove later
      state.draggable = newAgency;
    }
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
    let classes = [`action-${state.action}`];
    if(this.editable) {
      classes.push('editable')
    }

    return (
      <Host
        onDrop={this.addedElement.bind(this)}
        onDragOver={this.allowDrop.bind(this)}
        onDragEnd={this.dragEnd.bind(this)}      
        class={classes.join(' ')}
      >
        <slot></slot>
        <dc-council-card>
          <span slot="action">
            {state.editable ? this.renderDelete() : null}
          </span>
          <span slot="title" id="title">
            <span id="titleView"
              onClick={this.editMode.bind(this)}
            >{this.committee?.name}</span>
            {/* <calcite-icon icon="group" scale="m" aria-hidden="true"></calcite-icon> */}
            <calcite-inline-editable
              id="titleEdit"
              scale="l"
              intl-cancel-editing="Cancelar"
              intl-enable-editing="Haga clic para editar"
              intl-confirm-changes="Guardar"
              controls={true}
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
                ref={el => this.titleInputEl = el}
              ></calcite-input-text>
          </calcite-inline-editable>
        </span>
        <span slot="details">
          {this.stats}
          {this.renderInfoPanel(this.committee)}
        <dc-council-committee-member-list
          members={this.committee.members}
          editable={this.editable}
          ref={el => (this.membersEl = el as HTMLDcCouncilCommitteeMemberListElement)}
        ></dc-council-committee-member-list>

        
        {this.renderAgencyList(this.agencies)}
        </span>
        {/* <ul class="details subtitle">
          {Object.keys(this.committee).map(key => {
            return <li>{key}: {this.committee[key]}</li>
          })}
          <li><a href={this.committee.link} target="_new">Website</a></li>
        </ul> */}

        </dc-council-card>
      </Host>
    );
  }

  private renderAgencyList(agencies: IAgency[] = []) {
    return <dc-council-agency-list
      agencies={agencies}
      display='all'
      ref={el => (this.agenciesEl = el as HTMLDcCouncilAgencyListElement)}
    >
      Agencies
    </dc-council-agency-list>;
  }
  private renderInfoPanel(committee: ICommittee) {
    if(committee.description?.length > 0) {
      return <dc-council-info-panel>
        <span slot="title">About</span>
        <div slot="header">About {committee.name}</div>
        <p slot="content">
          {committee.description}
        </p>
      </dc-council-info-panel>;
    } else {
      return;
    }
    
  }  
  private renderDelete() {
    if(this.editable) {
      return ( <calcite-button
          id="deleteButton"
          scale="s"
          appearance="transparent"
          color="red"
          icon-start="x"
          alignment="center"
          type="button"
          width="auto"
          onClick={this.deleteCommittee.bind(this)}
        >Delete Committee</calcite-button>)
    } else {
      return(
       <calcite-button
          id="deleteButton"
          scale="s"
          appearance="transparent"
          color="blue"
          icon-start="circle-disallowed"
          alignment="center"
          type="button"
          width="auto">Permament Committee</calcite-button>
      )
    }
  }
}
