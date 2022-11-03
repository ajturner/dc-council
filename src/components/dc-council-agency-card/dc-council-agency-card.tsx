import { Component, Host, h, Prop } from '@stencil/core';
import Sortable from 'sortablejs';

@Component({
  tag: 'dc-council-agency-card',
  styleUrl: 'dc-council-agency-card.css',
  shadow: true,
})
export class DcCouncilAgencyCard {

  @Prop() agency;
  /**
   * Drag + Drop group name
   */
  @Prop() group: string = "committee";

  private container: HTMLElement;
  componentDidLoad() {
    Sortable.create(this.container, {
      animation: 150,
      group: this.group,
      ghostClass: 'ghost',
    });
  }

  render() {
    return (
      <Host>
      <div ref={el => (this.container = el as HTMLElement)}>
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
        </div>
      </Host>
    );
  }
}
