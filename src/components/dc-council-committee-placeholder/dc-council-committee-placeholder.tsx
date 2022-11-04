import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'dc-council-committee-placeholder',
  styleUrl: 'dc-council-committee-placeholder.css',
  scoped: true,
})
export class DcCouncilCommitteePlaceholder {

  @Prop() committee;

  render() {
    return (
      <Host>
        <slot></slot>
        <calcite-card>
          <span slot="title" class="title">
            Create new Committee
          </span>
        </calcite-card>
      </Host>
    );
  }

}
