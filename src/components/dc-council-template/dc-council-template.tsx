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
  @Listen('calciteTileSelectChange')
  changeChoice(evt) {
    const choice = evt.path[0].value;
    this.template = choice;
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
          checked=""
          description="Start from scratch and create your Committees from the ground up."
          heading="Blank"
          icon="add-in-new"
          name="light"
          input-alignment="start"
          width="auto"
          type="radio"
          value="blank"
        >
          <calcite-radio-button
            id=""
            checked=""
            name="light"
            scale="m"
          ></calcite-radio-button>
        </calcite-tile-select>
        <calcite-tile-select
          description="Start with the current council committee and Agency Assignments"
          heading="Current Council"
          icon="organization"
          name="light"
          input-alignment="start"
          width="auto"
          type="radio"
          value="current"
        >
          <calcite-radio-button
            id="calcite-tile-select-e2c35742-9769-3cea-b569-e9fb2c2a2729"
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
        <calcite-button
          alignment="start"
          appearance="outline"
          color="red"
          icon-start="share"
          scale="m"
          onClick={this.showModal.bind(this)}
        >
          <slot></slot>
        </calcite-button>
        <calcite-modal
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
        </calcite-modal>
      </Host>
    );
  }
}
