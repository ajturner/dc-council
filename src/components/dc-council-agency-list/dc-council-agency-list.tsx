import { Component, Host, h, Prop } from '@stencil/core';
import Sortable from 'sortablejs';
// https://ionic.io/blog/building-with-stencil-drag-and-drop-components

@Component({
  tag: 'dc-council-agency-list',
  styleUrl: 'dc-council-agency-list.css',
  shadow: true,
})
export class DcCouncilAgencyList {
  @Prop() agencies = [];

  /**
   * Drag + Drop group name
   */
  @Prop() group: string = "committee";

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
        <slot></slot>        

          <div 
            id="agencies" 
            class="container"
            ref={el => (this.container = el as HTMLElement)}
          >
          {this.agencies.map((agency) => {
            return (
              <dc-council-agency-card agency={agency}></dc-council-agency-card>
            )
          })}
        </div>        
      </Host>
    );
  }

}
