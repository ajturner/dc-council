import { Component, Host, h, Prop } from '@stencil/core';
import "@esri/calcite-components/dist/calcite/calcite.css";

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
        <calcite-card draggable="true">
          <span slot="title" class="title">
          <calcite-icon icon="user" scale="m" aria-hidden="true"></calcite-icon>
            {this.member?.name}
          </span>
            
            <ul class="details subtitle">
            {Object.keys(this.member).map(key => {
              return <li>{key}: {this.member[key]}</li>
            })}
            <li><a href={this.member.link} target="_new">Website</a></li>
          </ul>
        </calcite-card>
      </Host>
    );
  }
}