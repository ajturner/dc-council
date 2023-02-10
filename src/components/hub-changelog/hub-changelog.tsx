import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'hub-changelog',
  styleUrl: 'hub-changelog.css',
  shadow: true,
})
export class HubChangelog {

  render() {
    return (
      <Host>
        <slot></slot>
        <h2>Changelog</h2>
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
