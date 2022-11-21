import { Component, Host, h, Method, Listen, Prop } from '@stencil/core';

@Component({
  tag: 'dc-council-info-panel',
  styleUrl: 'dc-council-info-panel.css',
  shadow: true,
})
export class DcCouncilInfoPanel {
  @Prop({ mutable: true, reflect: true }) open: boolean = false;

  @Method()
  public async showModal() {
    this.open = true;
  }
  @Method()
  public async hideModal() {
    this.open = false;
  }

  @Listen('calciteModalClose')
  saveChoice() {
    this.hideModal();
  }  

  render() {
    return (
      <Host>
        <calcite-button
          appearance="transparent"
          scale="m"
           onClick={this.showModal.bind(this)}
        >
          <slot name="title"></slot>
        </calcite-button>
        {this.renderModal()}
      </Host>
    );
  }
  private renderModal() {
    return <calcite-modal
      color=""
      open={this.open}
      background-color="white"
      scale="m"
      width="m"
      intl-close="Close"
      // ref={(el: HTMLCalciteModalElement) => this.modalEl = el} 
      aria-labelledby="modal-share"
    >
      <h3 id="header" slot="header">Start your Fantasy Council</h3>
      <div id="content" slot="content">
        <slot name="content"></slot>
      </div>
      <calcite-button
        slot="primary"
        width="full"
        onClick={this.hideModal.bind(this)}
      >
        Done
      </calcite-button>
    </calcite-modal>;
  }

}
