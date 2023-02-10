import { Component, Host, h, Prop, Method, Listen, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'dc-council-template',
  styleUrl: 'dc-council-template.css',
  shadow: true,
})
export class DcCouncilTemplate {

  @Prop({ mutable: true, reflect: true }) template: string = "current";
  @Prop({ mutable: true, reflect: true }) open: boolean = false;
  @Event() templateSelected: EventEmitter<string>;

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
    this.templateSelected.emit(this.template);
    this.hideModal();
  }
  // @Listen('calciteTileSelectChange')
  changeChoice(evt) {
    // TODO: figure out why calciteTileSelectChange doesn't have a target value
    const choice = evt.path[0].value;
    this.template = choice;
  }

  // TODO: added until calciteTileSelectChange includes target value
  templateBlank() {
    this.template = 'blank';
  }
  templateCurrent() {
    this.template = 'current';
  }
  chooseTemplate(template: string) {
    this.templateSelected.emit(template);
  }
  
  // Reference to tile select
  tileSelectEl: HTMLInputElement;

  renderChoice() {
    return (
      <calcite-tile-select-group 
        ref={el => (this.tileSelectEl = el as HTMLInputElement)}
          layout="horizontal" 
          dir="ltr">
        <calcite-tile-select
          checked={true}
          description="Start with the current council committee and Agency Assignments"
          heading="Current Council"
          icon="organization"
          name="light"
          input-alignment="start"
          width="auto"
          type="radio"
          value="current"
          onClick={_ev => this.templateCurrent.bind(this)}
        >
          <calcite-radio-button
            checked={true}
            id="currentrb"
            value="currentrb"
            name="light"
            scale="m"
          ></calcite-radio-button>
        </calcite-tile-select>
        <calcite-tile-select
          description="Start from scratch and create your Committees from the ground up."
          heading="Blank"
          icon="add-in-new"
          name="light"
          input-alignment="start"
          width="auto"
          type="radio"
          value="blank"
          onClick={this.templateBlank.bind(this)}
        >
          <calcite-radio-button
            id="blankrb"
            name="light"
            scale="m"
          ></calcite-radio-button>
        </calcite-tile-select>
      </calcite-tile-select-group>
    )
  }

  render() {
    return (
      <Host>
        <slot name="title"></slot>
        {this.renderChoiceButtons()}
        {this.renderModal()}
      </Host>
    );
  }

  // Shows modal
  // private renderShowModalButton() {
  //   return <calcite-button
  //     alignment="start"
  //     appearance="outline"
  //     color="red"
  //     icon-start="reset"
  //     scale="m"
  //     onClick={this.showModal.bind(this)}
  //   >
  //     <slot></slot>
  //   </calcite-button>;
  // }

  // Separate, direct buttons
  private renderChoiceButtons() {
    return( 
      <span class="choiceButtons">
      <calcite-button
        alignment="start"
        appearance="outline"
        color="blue"
        icon-start="organization"
        scale="m"
          onClick={(_ev) => {this.chooseTemplate('current')}}
      >
        Reset to current Committees
      </calcite-button>
      <calcite-button
        alignment="start"
        appearance="outline"
        color="red"
        icon-start="reset"
        scale="m"
          onClick={(_ev) => {this.chooseTemplate('blank')}}
      >
        Clear all Committees
      </calcite-button>
      </span>
    )
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
      <h3 slot="header">Start your Fantasy Council</h3>
      <div slot="content">
        <p>
          You can now create your own DC Fantasy Council. Create Committees, assign Chairs + Members, then give them oversight of Millions (or Billions) of dollars in Agency direction!
        </p>
        <p id="choices">
          {this.renderChoice()}
        </p>
      </div>
      <calcite-button
        slot="primary"
        width="full"
        onClick={this.saveChoice.bind(this)}
      >
        Done
      </calcite-button>
    </calcite-modal>;
  }
}
