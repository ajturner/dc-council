import { Component, Host, h, Prop, Listen, Method } from '@stencil/core';
import state, { setVersion } from '../../utils/state';

@Component({
  tag: 'dc-council-share',
  styleUrl: 'dc-council-share.css',
  shadow: true,
})
export class DcCouncilShare {
  // modalEl: HTMLCalciteModalElement; 
  inputEl: HTMLInputElement;

  @Prop({ mutable: true, reflect: true }) open: boolean = false
  @Prop({ mutable: true, reflect: true }) url: string = "";

  @Method()
  public async showModal() {
    this.url = setVersion(state.committees);
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

  renderFacebook(url: string = "") {
    return (
      <div class="shareButton">
      <calcite-button
        color="blue"
        appearance="primary"
        icon="chevron-left"
        width="full"
        href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
      >
        Share on Facebook
      </calcite-button>
      </div>
    )
  }
  renderTwitter(url: string = "") {
    return (
      <div class="shareButton">
      <calcite-button
        color="blue"
        appearance="primary"
        icon="chevron-left"
        width="full"
        href={`https://twitter.com/intent/tweet?text=${url}`}
      >
        Share on Twitter
      </calcite-button>
      </div>
    )
  }  

  renderCopy(url:string = "") {
    return (
      <span class="shareurl">
      <input
        type="text" 
        class="code" 
        ref={(el: HTMLInputElement) => this.inputEl = el} 
        value={url}
        readonly>
      </input>
      
      <calcite-button
          slot="action"
          alignment="center"
          appearance="solid"
          color="blue"
          scale="m"
          type="button"
          width="auto"
          onClick={(_ev: Event) => this.copyText()}
        >
          Copy URL
      </calcite-button>
      
      </span>
    )
  }
  copyText() {
    /* Select the text field */
    this.inputEl.select();
    this.inputEl.setSelectionRange(0, 99999); /*For mobile devices*/

    /* Copy the text inside the text field */
    document.execCommand("copy");
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
              {this.renderCopy(this.url)}
              {this.renderTwitter(this.url)}
              {this.renderFacebook(this.url)}
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
