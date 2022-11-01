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
      </Host>
    );
  }

}
