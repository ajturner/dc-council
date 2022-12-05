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

  componentWillLoad() {
    this.url = window.location.href;
  }

  @Method()
  public async showModal() {
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

  @Method()
  public async saveCouncil() {
    this.url = await setVersion(state.committees);
  }

  
  renderFacebook(url: string = "") {
    return (
      <div class="shareButton">
      <calcite-button
        color="blue"
        appearance="primary"
        icon="chevron-left"
        width="full"
        target="_new"
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
        target="_new"
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
        {this.renderButtons(!state.editable || (state.editable && state.saved))}
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
              Thank you for crafting your proposal for DC Council Committees! <br/>
              You can copy the URL below to share with other people.
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


  private renderButtons(savedState:boolean) {

    const shareButton = <calcite-button
      alignment="start"
      appearance="outline"
      color="blue"
      icon-start="share"
      scale="m"
      onClick={this.showModal.bind(this)}
    >
      <slot>Share</slot>
    </calcite-button>;

    const saveButton = <calcite-button
      alignment="start"
      appearance={savedState ? "outline" : "solid"}
      color="blue"
      icon-start="save"
      scale="m"
      onClick={this.saveCouncil.bind(this)}
    >
      Save
    </calcite-button>;

    return savedState ? shareButton : saveButton;
  }
}
