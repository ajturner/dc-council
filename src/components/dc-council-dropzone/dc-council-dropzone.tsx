import { Component, Host, h, Prop, Listen, Event, EventEmitter } from '@stencil/core';
import {Sortable, MultiDrag} from 'sortablejs';
// https://ionic.io/blog/building-with-stencil-drag-and-drop-components
Sortable.mount(new MultiDrag());

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

  @Event() addedElement : EventEmitter<any>;

  @Listen('onEnd') 
  dragEnd(evt) {
    console.log("draggable onEnd", evt);
    this.addedElement.emit(evt);
  }



  componentDidLoad() {

    Sortable.create(this.container, {
      animation: 150,
      group: this.group,
      ghostClass: 'ghost',
      multiDrag: true,
      fallbackTolerance: 3, // So that we can select items on mobile
     	selectedClass: 'selected', // The class applied to the selected items
      onEnd: this.dragEnd.bind(this)
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
