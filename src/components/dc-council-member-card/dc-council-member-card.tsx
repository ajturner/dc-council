import { Component, Host, h, Prop, getAssetPath, EventEmitter, Event } from '@stencil/core';
import "@esri/calcite-components/dist/calcite/calcite.css";
import state from '../../utils/state';
import { CardAction } from '../../utils/types';

@Component({
  tag: 'dc-council-member-card',
  styleUrl: 'dc-council-member-card.css',
  shadow: true,
  assetsDirs: ['assets'],
})
export class DcCouncilMemberCard {

  @Prop() member;

  /**
   * Determines if Members list is editable
   * used mostly for "Committee of the Whole"
   */  
  @Prop() editable:boolean = true;

  /** 
   * Should this member be removable (show action)
   */
  @Prop() action:CardAction = null;
  @Event() memberRemove: EventEmitter<any>;

  dragEnd(_ev) {
    state.action = "";
  }
  dragStart(ev) {
    state.action = "member";

    // Change the source element's background color
    // to show that drag has started
    ev.currentTarget.classList.add("dragging");
    // Clear the drag data cache (for all formats/types)
    ev.dataTransfer.clearData();
    // Set the drag's format and data.
    // Use the event target's id for the data
    ev.dataTransfer.setData("text/plain", JSON.stringify(this.member));

  }
  render() {
    const imageSrc = getAssetPath(`../assets/2022/photos/${this.member.photo}`);

    return (
      <Host
        draggable={String(this.editable)}
        onDragStart={this.dragStart.bind(this)}
        onDragEnd={this.dragEnd.bind(this)}
      >
        <slot></slot>
        <dc-council-card
          thumbnail={this.member.photo ? imageSrc : null}
        >
          <span slot="action">
            {this.renderAction(this.action)}
          </span>
          <span slot="title" class="title">
            
            <span id="name">{this.member?.name}</span><br/>
            <span id="role">{this.member?.role}</span> 
          </span>

          <div slot="subtitle" id="details">
          </div>            
            
        </dc-council-card>
      </Host>
    );
  }

  private renderAction(action:CardAction) {
    if(this.editable && action === CardAction.remove) {
      return <calcite-icon icon="x" scale="m" aria-hidden="true"
        onClick={(_evt) => this.memberRemove.emit(this.member)}
      ></calcite-icon>;
    }
  }
}