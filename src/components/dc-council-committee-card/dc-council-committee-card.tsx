import { Component, Host, h, Listen, Prop, Event, EventEmitter } from '@stencil/core';
import { ICommittee } from '../../utils/types';

@Component({
  tag: 'dc-council-committee-card',
  styleUrl: 'dc-council-committee-card.css',
  scoped: true,
})
export class DcCouncilCommitteeCard {

  @Prop() committee: ICommittee;
  
  private membersEl:HTMLDcCouncilCommitteeMemberListElement;
  private agenciesEl:HTMLDcCouncilAgencyListElement;
  
  @Event() removeCommittee: EventEmitter<any>;
  @Event() committeeUpdated: EventEmitter<ICommittee>;

  @Listen('membersAdded')
  async membersAdded(_evt) {
    this.committee.members = await this.membersEl.getMembers();
    this.committeeUpdated.emit( this.committee );
  }
  @Listen('agenciesAdded')
  async agenciesAdded(_evt) {
    this.committee.agencies = this.agenciesEl.agencies;
    
    this.committeeUpdated.emit( this.committee );
  } 

  calculateBudget() {
    const budgetSum = this.committee.agencies?.reduce((sum, agency) => {
    // debugger;
      return sum += Number(agency.budget);
    }, 0);
    const budgetString = new Intl.NumberFormat('en-US', 
      { 
        style: 'currency', 
        currency: 'USD',
        maximumFractionDigits: 0, 
      }).format(budgetSum);
    return budgetString;
  }

  deleteButton() {
    console.log(this.membersEl);
    this.removeCommittee.emit(this.committee);
  }

  render() {
    return (
      <Host>
        <slot></slot>
        <calcite-card>
          <span slot="title" class="title">
          {/* <calcite-icon icon="group" scale="m" aria-hidden="true"></calcite-icon> */}
            <calcite-inline-editable
              scale="l"
              intl-cancel-editing="Cancelar"
              intl-enable-editing="Haga clic para editar"
              intl-confirm-changes="Guardar"
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
          
        </span>
        <span slot="subtitle">
          {this.committee.agencies?.length} agencies, 
          {this.calculateBudget()} budget,
          {this.committee.members?.members?.length} members
          {/* {this.membersEl.getMembers().length} */}

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
          <calcite-button
            id="card-icon-test-6"
            scale="s"
            appearance="transparent"
            color="red"
            icon-start="x"
            alignment="center"
            type="button"
            width="auto"
            onClick={this.deleteButton.bind(this)}
          >Delete Committee</calcite-button>
        </div>        
        </calcite-card>
      </Host>
    );
  }

}
