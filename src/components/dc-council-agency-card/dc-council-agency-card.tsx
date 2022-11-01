import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'dc-council-agency-card',
  styleUrl: 'dc-council-agency-card.css',
  shadow: true,
})
export class DcCouncilAgencyCard {

  @Prop() agency;

  render() {
    return (
      <Host>
        <slot></slot>
        <calcite-card draggable="true">
          <span slot="title" class="title">
            <calcite-icon icon="organization" scale="m" aria-hidden="true"></calcite-icon>
            {this.agency?.name}
          </span>

          <ul class="details subtitle">
            <li>Cluster: {this.agency.cluster}</li>
            <li>Budget: {this.agency.budget}</li>
            <li><a href={this.agency.link} target="_new">Website</a></li>
          </ul>
        </calcite-card>
      </Host>
    );
  }
}
