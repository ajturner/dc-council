import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'dc-council-member-card',
  styleUrl: 'dc-council-member-card.css',
  shadow: true,
})
export class DcCouncilMemberCard {

  @Prop() member;

  render() {
    return (
      <Host>
        <slot></slot>
        <h3>{this.member?.name}</h3>
      </Host>
    );
  }

}
