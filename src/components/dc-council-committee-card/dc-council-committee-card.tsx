import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'dc-council-committee-card',
  styleUrl: 'dc-council-committee-card.css',
  shadow: true,
})
export class DcCouncilCommitteeCard {

  @Prop() committee;

  render() {
    return (
      <Host>
        <slot></slot>
        <h3>{this.committee?.name}</h3>
      </Host>
    );
  }

}
