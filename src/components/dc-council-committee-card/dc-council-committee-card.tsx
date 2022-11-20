import { Component, Host, h, Listen, Prop, Event, EventEmitter, Element, Method, State } from '@stencil/core';
import { calculateBudget } from '../../utils/data';
import state from '../../utils/state';
import { ICommittee } from '../../utils/types';

@Component({
  tag: 'dc-council-committee-card',
  styleUrl: 'dc-council-committee-card.css',
  scoped: true,
})
export class DcCouncilCommitteeCard {
  @Element() el: HTMLElement;
  
  titleInputEl:HTMLInputElement;

  @Prop() committee: ICommittee;
  
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

  componentWillLoad() {  
    this.editable = this.committee.editable;
    this.updateStats(this.committee);
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

  editMode(editing:boolean = true) {
    if(editing && this.committee.editable) {
      this.el.classList.add("editing");
    } else {
      // this.el.classList.remove("editing");
    }
  }

  @Listen('calciteInlineEditableEditConfirm')
  titleChanged(evt) {
    
    this.committee.name = this.titleInputEl.value;
    console.log("titleChanged", {evt:evt, name: this.committee.name , t: this.titleInputEl.value, class: this.el.classList});
    this.el.classList.remove("editing");
  }
  render() {
    return (
      <Host
        class={{
          'editable': this.editable
        }}
      >
        <slot></slot>
        <dc-council-card>
          <span slot="action">
            {this.renderDelete()}
          </span>
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
        <dc-council-committee-member-list
          members={this.committee.members}
          editable={this.editable}
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

        </dc-council-card>
      </Host>
    );
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
