import { Component, Host, h, Prop } from '@stencil/core';
import Sortable from 'sortablejs';
// https://ionic.io/blog/building-with-stencil-drag-and-drop-components

@Component({
  tag: 'dc-council-committee-card',
  styleUrl: 'dc-council-committee-card.css',
  shadow: true,
})
export class DcCouncilCommitteeCard {

  @Prop() committee;

  /**
   * Agencies that are managed by this committee
   */
  @Prop() agencies = [];

  /**
   * Drag + Drop group name
   */
  @Prop() group: string = "committee";

  componentDidLoad() {
    Sortable.create(this.container, {
      animation: 150,
      group: this.group,
      ghostClass: 'ghost',
    });
  }
  private container: HTMLElement;

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

        <h3>Agencies</h3>
        <dc-council-agency-list></dc-council-agency-list>
      </Host>
    );
  }

}
