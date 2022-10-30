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
        <ul>
          {Object.keys(this.committee).map(key => {
            return <li>{key}: {this.committee[key]}</li>
          })}
          <li><a href={this.committee.link} target="_new">Website</a></li>
        </ul>
      </Host>
    );
  }

}
