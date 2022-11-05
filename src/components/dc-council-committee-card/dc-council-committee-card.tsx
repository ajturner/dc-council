import { Component, Host, h, Listen, Prop, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'dc-council-committee-card',
  styleUrl: 'dc-council-committee-card.css',
  scoped: true,
})
export class DcCouncilCommitteeCard {

  @Prop() committee;
  
  private membersEl:HTMLDcCouncilCommitteeMemberListElement;
  
  /**
   * Agencies that are managed by this committee
   */
  @Prop() agencies = [];

  @Prop() members = {chair: [], members: []};

  @Event() removeCommittee: EventEmitter<any>;

  @Listen('membersAdded')
  async membersAdded(_evt) {
    this.members = await this.membersEl.getMembers();
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
          <calcite-icon icon="group" scale="m" aria-hidden="true"></calcite-icon>
          
          <calcite-input-text
            scale="m"
            status="idle"
            alignment="start"
            prefix-text=""
            suffix-text=""
            value={this.committee?.name}
            placeholder="Committee Name"
          ></calcite-input-text>
        </span>
        <span slot="subtitle">
          {this.agencies.length} agencies, 
          $0 budget,
          {this.members?.members.length} members
          {/* {this.membersEl.getMembers().length} */}

        <dc-council-committee-member-list
          ref={el => (this.membersEl = el as HTMLDcCouncilCommitteeMemberListElement)}
        ></dc-council-committee-member-list>

        
        <dc-council-agency-list>
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
