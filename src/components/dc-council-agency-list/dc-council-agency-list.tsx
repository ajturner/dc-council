import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'dc-council-agency-list',
  styleUrl: 'dc-council-agency-list.css',
  shadow: true,
})
export class DcCouncilAgencyList {
  @Prop() agencies = [];

  render() {
    return (
      <Host>
        <slot></slot>

          <div 
            id="agencies" 
            
          >
          <dc-council-dropzone
            group="agency"
            class="container">
          {this.agencies.map((agency) => {
            return (
              <dc-council-agency-card agency={agency}></dc-council-agency-card>
            )
          })}
          </dc-council-dropzone>
        </div>
      </Host>
    );
  }
}
