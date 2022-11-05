import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'dc-council-committee-card',
  styleUrl: 'dc-council-committee-card.css',
  scoped: true,
})
export class DcCouncilCommitteeCard {

  @Prop() committee;

  /**
   * Agencies that are managed by this committee
   */
  @Prop() agencies = [];

  render() {
    return (
      <Host>
        <slot></slot>
        <calcite-card>
          <span slot="title" class="title">
          <calcite-icon icon="group" scale="m" aria-hidden="true"></calcite-icon>
          {this.committee?.name}
        </span>
        <ul class="details subtitle">
          {Object.keys(this.committee).map(key => {
            return <li>{key}: {this.committee[key]}</li>
          })}
          <li><a href={this.committee.link} target="_new">Website</a></li>
        </ul>
        </calcite-card>

        <h3>Staff</h3>
        <dc-council-committee-member-list></dc-council-committee-member-list>

        <h3>Agencies</h3>
        <dc-council-agency-list></dc-council-agency-list>
      </Host>
    );
  }

}
