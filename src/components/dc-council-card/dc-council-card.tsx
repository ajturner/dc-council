import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'dc-council-card',
  styleUrl: 'dc-council-card.css',
  shadow: true,
  assetsDirs: ['assets'],
})
export class DcCouncilCard {

  @Prop() thumbnail:string = null;

  render() {
    return (
      <Host class="card">
        <span id="action">
        <slot name="action">
          <calcite-icon icon="x" scale="m" aria-hidden="true"></calcite-icon>
        </slot></span>
        
        <img id="thumbnail" src={this.thumbnail}></img>
        <span id="title"><slot name="title"></slot></span>
        <span id="details"><slot name="details"></slot></span>
      </Host>
    );
  }

}
