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
        <h3>{this.agency?.name}</h3>
      </Host>
    );
  }

}
