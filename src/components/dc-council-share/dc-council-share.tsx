import { Component, Host, h, Prop, Listen, Method } from '@stencil/core';
import state, { setVersion } from '../../utils/state';

@Component({
  tag: 'dc-council-share',
  styleUrl: 'dc-council-share.css',
  shadow: true,
})
export class DcCouncilShare {
  // modalEl: HTMLCalciteModalElement; 

  @Prop({mutable: true, reflect: true}) open:boolean = false

  @Method()
  public async showModal() {
    setVersion(state.committees);
    this.open = true;
  }
  @Method() 
  public async hideModal() {
    this.open = false;
  }  
  @Listen('calciteModalClose')
  close() {
    this.open = false;
  }

  render() {
    return (
      <Host>
        <calcite-button
          alignment="start"
          appearance="solid"
          color="blue"
          icon-start="share"
          scale="m"
          onClick={this.showModal.bind(this)}
        >
          <slot>Share</slot>
        </calcite-button>
        <calcite-modal
          color=""
          open={this.open}
          background-color="white"
          scale="m"
          width="s"
          intl-close="Close"
          // ref={(el: HTMLCalciteModalElement) => this.modalEl = el} 
          aria-labelledby="modal-share"
        >
          <h3 slot="header">Share your Fantasy Council</h3>
          <div slot="content">
            <p>
              Thank you for crafting your proposal for DC Council Committees! Now share your lineup on social media and invite your friends to make their own!
            </p>
            <p>
                <calcite-button
                color="neutral"
                appearance="outline"
                icon="chevron-left"
                width="full"
              >
                Share on Facebook
              </calcite-button>
            </p>
          </div>
          <calcite-button 
            slot="primary" 
            width="full"
            onClick={this.hideModal.bind(this)}
            >
            Done
          </calcite-button>
        </calcite-modal>
      </Host>
    );
  }

}
