import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'hub-text',
  styleUrl: 'hub-text.css',
  shadow: true,
})
export class HubText {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
