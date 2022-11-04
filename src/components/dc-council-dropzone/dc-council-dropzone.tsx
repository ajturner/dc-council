import { Component, Host, h, Prop } from '@stencil/core';
import Sortable from 'sortablejs';
// https://ionic.io/blog/building-with-stencil-drag-and-drop-components

@Component({
  tag: 'dc-council-dropzone',
  styleUrl: 'dc-council-dropzone.css',
  scoped: true,
})
export class DcCouncilDropzone {

/**
   * Drag + Drop group name
   */
  @Prop() group: string;

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
        <div ref={el => (this.container = el as HTMLElement)}>
          <slot></slot>
        </div>
      </Host>
    );
  }

}
