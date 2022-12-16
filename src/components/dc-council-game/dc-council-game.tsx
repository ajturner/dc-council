import { Component, Host, h, State, Prop, Listen, Element } from '@stencil/core';
import { loadAgencies, loadBlank, loadCommittees, loadMembers } from '../../utils/data';
import state, { checkEditable, getTemplate, getTemplateParam, getVersion, resetState } from '../../utils/state';
import { CouncilTemplate, ICommittee, IMember } from '../../utils/types';

@Component({
  tag: 'dc-council-game',
  styleUrl: 'dc-council-game.css',
  scoped: true,
})
export class DcCouncilGame {
  @Element() el: HTMLElement;
  
  @Prop({ mutable: true, reflect: true }) template: CouncilTemplate = CouncilTemplate.current;

  /**
   * URL to Agency spreadsheet
   */
  @Prop() agencyFilename: string = "assets/2022/agencies.csv";
  @Prop() minoragencyFilename: string = "assets/2022/minoragencies.csv";
  @Prop() committeeFilename: string = "assets/2022/committees.csv";
  @Prop() memberFilename: string = "assets/2022/members.csv";

  @Prop({ mutable: true, reflect: true }) selectedPieces: string = "agencies";

  /**
   * restart - showing template
   */
  @Prop({ mutable: true, reflect: true }) restart: boolean = false; 

  @State() agencies = [];
  @Prop({mutable: true, reflect: true}) committees: Array<ICommittee> = [];
  @State() members: Array<IMember> = [];
  
  // Show/hide sidebar
  @State() sidebar: boolean = true;

  // Show major or minor agencies
  @State() minorAgencyDisplay:boolean = false;

  titleInputEl:HTMLInputElement;

  private agencyDisplayEl;

  async componentWillLoad() {

    this.template = getTemplate(this.template);

    this.members = await loadMembers(this.memberFilename);
    const agencies = await loadAgencies(this.agencyFilename);
    const minoragencies = await loadAgencies(this.minoragencyFilename);
    this.agencies = [...agencies, ...minoragencies];

    // what agencies are available
    state.agencies = this.agencies;


    this.committees = await this.loadTemplate(this.template);

    // TODO: Move this to a more central state management
    state.council = {
      ...state.council,
      committees: this.committees
    }
    // TODO: clean up this logic for how to determine this is the initial view
    if(!getTemplateParam() || !state.council) {
      this.restart = true;
    }

  }
  async componentWillRender() {
    checkEditable();
  }

  @State() editing: boolean = false;
  editMode() {
    if(!this.editing) {
      this.editing = true;
      this.el.classList.add("editing");
    }
  }
  @Listen('calciteInlineEditableEditConfirm')
  titleChanged(_evt) {
    
    state.council.title = this.titleInputEl.value;
    this.el.classList.remove("editing");
    this.editing = false;

    // Council needs to be resaved;
    state.saved = false;
  }


  availableAgencies(committees: Array<ICommittee>) {
    const usedAgencies = committees.map(committee => committee.agencies?.map(agency => agency.name)).flat()

    const availableAgencies = this.agencies.filter(agency => {
      return !usedAgencies.includes(agency.name);
    })
    return availableAgencies;
  }

  async loadTemplate(template: CouncilTemplate = CouncilTemplate.saved): Promise<Array<ICommittee>> {
    let committees: Array<ICommittee> = [];

    switch (template) {
      case CouncilTemplate.current: {
        committees = await loadCommittees(this.committeeFilename, this.members, this.agencies);
        break;
      }
      case CouncilTemplate.saved: {
        committees = await getVersion(this.members, this.agencies, this.committees);
        break;
      }
      default: { 
        // blank, but with placeholder committees
        let permanentCommittees = this.committees.filter(c => !c.editable);
        committees = await loadBlank(permanentCommittees);
      }
    }

    state.agencies = this.availableAgencies(committees);
    state.committees = committees;

    return committees;
  }

  @Listen('templateSelected')
  async templateSelected(evt) {
    resetState();
    const committees = await this.loadTemplate(evt.detail);
    this.committees = [...committees];
    state.council = {committees: this.committees};
  }

  @Listen('calciteRadioGroupChange')
  async selectorChanged(evt) {
    this.selectedPieces = evt.detail;
  }

  renderSelector() {
    return (
      <calcite-radio-group
        layout="horizontal"
        appearance="solid"
        scale="l"
        width="full"
      >
        <calcite-radio-group-item value="agencies" checked="">
          Agencies
        </calcite-radio-group-item>
        <calcite-radio-group-item value="members" >
          Members
        </calcite-radio-group-item>
      </calcite-radio-group>
    );

  }

  render() {

    return (
      <Host>
        <div id="gameboard" class={`display-${this.selectedPieces} sidebar-${this.sidebar ? 'visible' : 'hidden'}`}>
          <div id="header">
            <slot name="header"></slot>
            {this.renderInfoPanel()}
            {/* {this.renderPreviewPanel()} */}
            

            {this.renderTemplatePicker()}
          </div>
          {state.editable ? this.renderSidebar() : null}
          {this.renderBoard(this.committees)}
          {this.renderFooter()}
        </div>
      </Host>
    );
  }


  private renderTemplatePicker() {
    return <dc-council-template
      open={this.restart}
      class="control"
      id="reset">
      <span id="start" slot="title">Create your own</span>
    </dc-council-template>;
  }

  private renderFooter() {
    return <div id="footer">
      <slot name="footer"></slot>
    </div>;
  }

  private renderBoard(_committees: ICommittee[]) {
    return <div id="board">
      <dc-council-committee-list
        committees={this.committees}
      >
        <span id="boardHeader">
        {this.renderEditableTitle()}
          
          <dc-council-share class="control" scale="l">
            Share
          </dc-council-share>
          <dc-council-visualization
            committees={state.committees}
          >
            <span slot="title">Budget Visualization</span>
          </dc-council-visualization>
          <span id="previewSelection">
            {state.draggable}
          </span>
        </span>
      </dc-council-committee-list>

    </div>;
  }

  private renderEditableTitle() {
    // debugger;
    return <span slot="title" id="title">
      <span id="titleView"
        onClick={this.editMode.bind(this)}
      >{!!state.council?.title ? state.council.title : "Your Council (Click to Change Title)"}</span>
      {/* <calcite-icon icon="group" scale="m" aria-hidden="true"></calcite-icon> */}
      <calcite-inline-editable
        id="titleEdit"
        scale="l"
        intl-cancel-editing="Cancelar"
        intl-enable-editing="Haga clic para editar"
        intl-confirm-changes="Guardar"
        controls={true}
      >
        <calcite-input-text
          scale="l"
          status="idle"
          alignment="start"
          prefix-text=""
          suffix-text=""
          value={state.council?.title}
          placeholder="Council Name"
          ref={el => this.titleInputEl = el}
        ></calcite-input-text>
      </calcite-inline-editable>
    </span>;
  }

  @Listen('calciteCheckboxChange') 
  async agencyDisplayChange(evt) {
    console.log('agencyDisplayChange', {evt, value: this.agencyDisplayEl.checked});
    this.minorAgencyDisplay = this.agencyDisplayEl.checked;

  }
  private renderSidebar() {
    return <div id="sidebar"
      class={{
        hidden: this.sidebar
      }}
    >
      <div id="selector">{this.renderSelector()}</div>
      <div id="pieces">
        <dc-council-member-list
          members={this.members}
        >
        </dc-council-member-list>
        <dc-council-agency-list
          display={this.minorAgencyDisplay ? 'all' : 'major'}
          agencies={state.agencies}
          class="pieces"
          editable={false}
        >
        <calcite-label layout="inline">
          <calcite-checkbox ref={el => this.agencyDisplayEl = el} checked={this.minorAgencyDisplay} scale="m"></calcite-checkbox>
          Show minor agencies
        </calcite-label>
        </dc-council-agency-list>
      </div>
      <span id="sidebar-tab" onClick={() => this.sidebar = this.sidebar ? false : true}>
        <calcite-icon icon={this.sidebar ? 'chevronLeft' : 'chevronRight'} scale="m"></calcite-icon>
      </span>

    </div>;
  }

  private renderInfoPanel() {
    return <dc-council-info-panel>
      <span slot="title">How to use this tool</span>
      <div slot="header">How to Use this tool</div>
      <p slot="content">
        <ol>
          <li>Create/rename any desired committees.</li>
          <li>Drag and drop a Councilmember into the chair position, and then others into the committee member positions.</li>
          <li>Drag and drop the agencies this committee should have oversight of.</li>
          <li>When you're ready, click "Save" and you will be given the option to share your version on social media or via a link!</li>
        </ol>
      </p>
    </dc-council-info-panel>;
  }
  // private renderPreviewPanel() {
  //   return <dc-council-info-panel scale="m">
  //     <span slot="title">Preview</span>
  //     <div slot="header">Preview Council</div>
  //     <p slot="content">
  //       <dc-council-preview
  //         committees={state.committees}>
          
  //       </dc-council-preview>
  //     </p>
  //   </dc-council-info-panel>;
  // }  
}
