import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'hub-feed',
  styleUrl: 'hub-feed.css',
  shadow: true,
})
export class HubFeed {

  render() {
    return (
      <Host>
        <slot></slot>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
          <li>Item 4</li>
        </ul>
      </Host>
    );
  }

}
