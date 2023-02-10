import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'workspace-card',
  styleUrl: 'workspace-card.css',
  shadow: true,
})
export class WorkspaceCard {

  render() {
    return (
      <Host>
        <slot name="title"></slot>
        <slot></slot>
      </Host>
    );
  }

}
