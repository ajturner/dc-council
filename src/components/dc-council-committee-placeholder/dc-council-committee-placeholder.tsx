import { Component, Event, Host, h, Prop, EventEmitter } from '@stencil/core';

@Component({
  tag: 'dc-council-committee-placeholder',
  styleUrl: 'dc-council-committee-placeholder.css',
  scoped: true,
})
export class DcCouncilCommitteePlaceholder {

  @Prop() committee;

  @Event() addCommittee: EventEmitter;

  buttonClicked() {
    this.addCommittee.emit();
  }

  render() {
    return (
      <Host>
        <slot></slot>
        <calcite-button
          alignment="start"
          appearance="solid"
          color="blue"
          icon-start="plus"
          scale="m"
          onClick={this.buttonClicked.bind(this)}
        >
          Add Committee
        </calcite-button>
      </Host>
    );
  }

}
