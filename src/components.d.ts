/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { CardAction, CouncilTemplate, IAgency, ICommittee, ICommitteeMembers, IMember } from "./utils/types";
export namespace Components {
    interface DcCouncilAgencyCard {
        "action": CardAction;
        "agency": any;
    }
    interface DcCouncilAgencyList {
        "addAgency": (newAgencies: Array<IAgency>) => Promise<void>;
        "agencies": any[];
        "display": string;
        "removeAgency": (removedAgency: IAgency) => Promise<void>;
    }
    interface DcCouncilCard {
        "thumbnail": string;
    }
    interface DcCouncilCommitteeCard {
        "committee": ICommittee;
        "deleteCommittee": () => Promise<void>;
        /**
          * Determines if Members list is editable used mostly for "Committee of the Whole"
         */
        "editable": boolean;
    }
    interface DcCouncilCommitteeList {
        "committees": Array<ICommittee>;
    }
    interface DcCouncilCommitteeMemberList {
        /**
          * Determines if Members list is editable used mostly for "Committee of the Whole"
         */
        "editable": boolean;
        "getMembers": () => Promise<ICommitteeMembers>;
        "members": ICommitteeMembers;
    }
    interface DcCouncilCommitteePlaceholder {
        "committee": any;
    }
    interface DcCouncilDropzone {
        /**
          * Drag + Drop group name
         */
        "group": string;
        /**
          * Temporary id
         */
        "position": string;
    }
    interface DcCouncilGame {
        /**
          * URL to Agency spreadsheet
         */
        "agencyFilename": string;
        "committeeFilename": string;
        "committees": Array<ICommittee>;
        "memberFilename": string;
        /**
          * restart - showing template
         */
        "restart": boolean;
        "selectedPieces": string;
        "subagencyFilename": string;
        "template": CouncilTemplate;
    }
    interface DcCouncilInfoPanel {
        "hideModal": () => Promise<void>;
        "open": boolean;
        "showModal": () => Promise<void>;
    }
    interface DcCouncilMemberCard {
        /**
          * Should this member be removable (show action)
         */
        "action": CardAction;
        /**
          * Determines if Members list is editable used mostly for "Committee of the Whole"
         */
        "editable": boolean;
        "member": any;
    }
    interface DcCouncilMemberList {
        /**
          * Determines if Members list is editable used mostly for "Committee of the Whole"
         */
        "editable": boolean;
        /**
          * Maximum number of members allowed. Null or -1 means unlimited
         */
        "max": number;
        /**
          * Array of people in this list
         */
        "members": Array<IMember>;
        /**
          * Name of position for this to show
         */
        "position": string;
    }
    interface DcCouncilShare {
        "editUrl": string;
        "hideModal": () => Promise<void>;
        "open": boolean;
        "saveCouncil": () => Promise<void>;
        "shareUrl": string;
        "showModal": () => Promise<void>;
    }
    interface DcCouncilTemplate {
        "hideModal": () => Promise<void>;
        "open": boolean;
        "showModal": () => Promise<void>;
        "template": string;
    }
}
export interface DcCouncilAgencyCardCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLDcCouncilAgencyCardElement;
}
export interface DcCouncilAgencyListCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLDcCouncilAgencyListElement;
}
export interface DcCouncilCommitteeCardCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLDcCouncilCommitteeCardElement;
}
export interface DcCouncilCommitteePlaceholderCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLDcCouncilCommitteePlaceholderElement;
}
export interface DcCouncilDropzoneCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLDcCouncilDropzoneElement;
}
export interface DcCouncilMemberCardCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLDcCouncilMemberCardElement;
}
export interface DcCouncilMemberListCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLDcCouncilMemberListElement;
}
export interface DcCouncilTemplateCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLDcCouncilTemplateElement;
}
declare global {
    interface HTMLDcCouncilAgencyCardElement extends Components.DcCouncilAgencyCard, HTMLStencilElement {
    }
    var HTMLDcCouncilAgencyCardElement: {
        prototype: HTMLDcCouncilAgencyCardElement;
        new (): HTMLDcCouncilAgencyCardElement;
    };
    interface HTMLDcCouncilAgencyListElement extends Components.DcCouncilAgencyList, HTMLStencilElement {
    }
    var HTMLDcCouncilAgencyListElement: {
        prototype: HTMLDcCouncilAgencyListElement;
        new (): HTMLDcCouncilAgencyListElement;
    };
    interface HTMLDcCouncilCardElement extends Components.DcCouncilCard, HTMLStencilElement {
    }
    var HTMLDcCouncilCardElement: {
        prototype: HTMLDcCouncilCardElement;
        new (): HTMLDcCouncilCardElement;
    };
    interface HTMLDcCouncilCommitteeCardElement extends Components.DcCouncilCommitteeCard, HTMLStencilElement {
    }
    var HTMLDcCouncilCommitteeCardElement: {
        prototype: HTMLDcCouncilCommitteeCardElement;
        new (): HTMLDcCouncilCommitteeCardElement;
    };
    interface HTMLDcCouncilCommitteeListElement extends Components.DcCouncilCommitteeList, HTMLStencilElement {
    }
    var HTMLDcCouncilCommitteeListElement: {
        prototype: HTMLDcCouncilCommitteeListElement;
        new (): HTMLDcCouncilCommitteeListElement;
    };
    interface HTMLDcCouncilCommitteeMemberListElement extends Components.DcCouncilCommitteeMemberList, HTMLStencilElement {
    }
    var HTMLDcCouncilCommitteeMemberListElement: {
        prototype: HTMLDcCouncilCommitteeMemberListElement;
        new (): HTMLDcCouncilCommitteeMemberListElement;
    };
    interface HTMLDcCouncilCommitteePlaceholderElement extends Components.DcCouncilCommitteePlaceholder, HTMLStencilElement {
    }
    var HTMLDcCouncilCommitteePlaceholderElement: {
        prototype: HTMLDcCouncilCommitteePlaceholderElement;
        new (): HTMLDcCouncilCommitteePlaceholderElement;
    };
    interface HTMLDcCouncilDropzoneElement extends Components.DcCouncilDropzone, HTMLStencilElement {
    }
    var HTMLDcCouncilDropzoneElement: {
        prototype: HTMLDcCouncilDropzoneElement;
        new (): HTMLDcCouncilDropzoneElement;
    };
    interface HTMLDcCouncilGameElement extends Components.DcCouncilGame, HTMLStencilElement {
    }
    var HTMLDcCouncilGameElement: {
        prototype: HTMLDcCouncilGameElement;
        new (): HTMLDcCouncilGameElement;
    };
    interface HTMLDcCouncilInfoPanelElement extends Components.DcCouncilInfoPanel, HTMLStencilElement {
    }
    var HTMLDcCouncilInfoPanelElement: {
        prototype: HTMLDcCouncilInfoPanelElement;
        new (): HTMLDcCouncilInfoPanelElement;
    };
    interface HTMLDcCouncilMemberCardElement extends Components.DcCouncilMemberCard, HTMLStencilElement {
    }
    var HTMLDcCouncilMemberCardElement: {
        prototype: HTMLDcCouncilMemberCardElement;
        new (): HTMLDcCouncilMemberCardElement;
    };
    interface HTMLDcCouncilMemberListElement extends Components.DcCouncilMemberList, HTMLStencilElement {
    }
    var HTMLDcCouncilMemberListElement: {
        prototype: HTMLDcCouncilMemberListElement;
        new (): HTMLDcCouncilMemberListElement;
    };
    interface HTMLDcCouncilShareElement extends Components.DcCouncilShare, HTMLStencilElement {
    }
    var HTMLDcCouncilShareElement: {
        prototype: HTMLDcCouncilShareElement;
        new (): HTMLDcCouncilShareElement;
    };
    interface HTMLDcCouncilTemplateElement extends Components.DcCouncilTemplate, HTMLStencilElement {
    }
    var HTMLDcCouncilTemplateElement: {
        prototype: HTMLDcCouncilTemplateElement;
        new (): HTMLDcCouncilTemplateElement;
    };
    interface HTMLElementTagNameMap {
        "dc-council-agency-card": HTMLDcCouncilAgencyCardElement;
        "dc-council-agency-list": HTMLDcCouncilAgencyListElement;
        "dc-council-card": HTMLDcCouncilCardElement;
        "dc-council-committee-card": HTMLDcCouncilCommitteeCardElement;
        "dc-council-committee-list": HTMLDcCouncilCommitteeListElement;
        "dc-council-committee-member-list": HTMLDcCouncilCommitteeMemberListElement;
        "dc-council-committee-placeholder": HTMLDcCouncilCommitteePlaceholderElement;
        "dc-council-dropzone": HTMLDcCouncilDropzoneElement;
        "dc-council-game": HTMLDcCouncilGameElement;
        "dc-council-info-panel": HTMLDcCouncilInfoPanelElement;
        "dc-council-member-card": HTMLDcCouncilMemberCardElement;
        "dc-council-member-list": HTMLDcCouncilMemberListElement;
        "dc-council-share": HTMLDcCouncilShareElement;
        "dc-council-template": HTMLDcCouncilTemplateElement;
    }
}
declare namespace LocalJSX {
    interface DcCouncilAgencyCard {
        "action"?: CardAction;
        "agency"?: any;
        "onAgencyRemove"?: (event: DcCouncilAgencyCardCustomEvent<IAgency>) => void;
    }
    interface DcCouncilAgencyList {
        "agencies"?: any[];
        "display"?: string;
        "onAgenciesChanged"?: (event: DcCouncilAgencyListCustomEvent<any>) => void;
    }
    interface DcCouncilCard {
        "thumbnail"?: string;
    }
    interface DcCouncilCommitteeCard {
        "committee"?: ICommittee;
        /**
          * Determines if Members list is editable used mostly for "Committee of the Whole"
         */
        "editable"?: boolean;
        "onCommitteeUpdated"?: (event: DcCouncilCommitteeCardCustomEvent<ICommittee>) => void;
        "onRemoveCommittee"?: (event: DcCouncilCommitteeCardCustomEvent<any>) => void;
    }
    interface DcCouncilCommitteeList {
        "committees"?: Array<ICommittee>;
    }
    interface DcCouncilCommitteeMemberList {
        /**
          * Determines if Members list is editable used mostly for "Committee of the Whole"
         */
        "editable"?: boolean;
        "members"?: ICommitteeMembers;
    }
    interface DcCouncilCommitteePlaceholder {
        "committee"?: any;
        "onAddCommittee"?: (event: DcCouncilCommitteePlaceholderCustomEvent<any>) => void;
    }
    interface DcCouncilDropzone {
        /**
          * Drag + Drop group name
         */
        "group"?: string;
        "onAddedElement"?: (event: DcCouncilDropzoneCustomEvent<any>) => void;
        /**
          * Temporary id
         */
        "position"?: string;
    }
    interface DcCouncilGame {
        /**
          * URL to Agency spreadsheet
         */
        "agencyFilename"?: string;
        "committeeFilename"?: string;
        "committees"?: Array<ICommittee>;
        "memberFilename"?: string;
        /**
          * restart - showing template
         */
        "restart"?: boolean;
        "selectedPieces"?: string;
        "subagencyFilename"?: string;
        "template"?: CouncilTemplate;
    }
    interface DcCouncilInfoPanel {
        "open"?: boolean;
    }
    interface DcCouncilMemberCard {
        /**
          * Should this member be removable (show action)
         */
        "action"?: CardAction;
        /**
          * Determines if Members list is editable used mostly for "Committee of the Whole"
         */
        "editable"?: boolean;
        "member"?: any;
        "onMemberRemove"?: (event: DcCouncilMemberCardCustomEvent<any>) => void;
    }
    interface DcCouncilMemberList {
        /**
          * Determines if Members list is editable used mostly for "Committee of the Whole"
         */
        "editable"?: boolean;
        /**
          * Maximum number of members allowed. Null or -1 means unlimited
         */
        "max"?: number;
        /**
          * Array of people in this list
         */
        "members"?: Array<IMember>;
        "onMembersChanged"?: (event: DcCouncilMemberListCustomEvent<any>) => void;
        /**
          * Name of position for this to show
         */
        "position"?: string;
    }
    interface DcCouncilShare {
        "editUrl"?: string;
        "open"?: boolean;
        "shareUrl"?: string;
    }
    interface DcCouncilTemplate {
        "onTemplateSelected"?: (event: DcCouncilTemplateCustomEvent<string>) => void;
        "open"?: boolean;
        "template"?: string;
    }
    interface IntrinsicElements {
        "dc-council-agency-card": DcCouncilAgencyCard;
        "dc-council-agency-list": DcCouncilAgencyList;
        "dc-council-card": DcCouncilCard;
        "dc-council-committee-card": DcCouncilCommitteeCard;
        "dc-council-committee-list": DcCouncilCommitteeList;
        "dc-council-committee-member-list": DcCouncilCommitteeMemberList;
        "dc-council-committee-placeholder": DcCouncilCommitteePlaceholder;
        "dc-council-dropzone": DcCouncilDropzone;
        "dc-council-game": DcCouncilGame;
        "dc-council-info-panel": DcCouncilInfoPanel;
        "dc-council-member-card": DcCouncilMemberCard;
        "dc-council-member-list": DcCouncilMemberList;
        "dc-council-share": DcCouncilShare;
        "dc-council-template": DcCouncilTemplate;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "dc-council-agency-card": LocalJSX.DcCouncilAgencyCard & JSXBase.HTMLAttributes<HTMLDcCouncilAgencyCardElement>;
            "dc-council-agency-list": LocalJSX.DcCouncilAgencyList & JSXBase.HTMLAttributes<HTMLDcCouncilAgencyListElement>;
            "dc-council-card": LocalJSX.DcCouncilCard & JSXBase.HTMLAttributes<HTMLDcCouncilCardElement>;
            "dc-council-committee-card": LocalJSX.DcCouncilCommitteeCard & JSXBase.HTMLAttributes<HTMLDcCouncilCommitteeCardElement>;
            "dc-council-committee-list": LocalJSX.DcCouncilCommitteeList & JSXBase.HTMLAttributes<HTMLDcCouncilCommitteeListElement>;
            "dc-council-committee-member-list": LocalJSX.DcCouncilCommitteeMemberList & JSXBase.HTMLAttributes<HTMLDcCouncilCommitteeMemberListElement>;
            "dc-council-committee-placeholder": LocalJSX.DcCouncilCommitteePlaceholder & JSXBase.HTMLAttributes<HTMLDcCouncilCommitteePlaceholderElement>;
            "dc-council-dropzone": LocalJSX.DcCouncilDropzone & JSXBase.HTMLAttributes<HTMLDcCouncilDropzoneElement>;
            "dc-council-game": LocalJSX.DcCouncilGame & JSXBase.HTMLAttributes<HTMLDcCouncilGameElement>;
            "dc-council-info-panel": LocalJSX.DcCouncilInfoPanel & JSXBase.HTMLAttributes<HTMLDcCouncilInfoPanelElement>;
            "dc-council-member-card": LocalJSX.DcCouncilMemberCard & JSXBase.HTMLAttributes<HTMLDcCouncilMemberCardElement>;
            "dc-council-member-list": LocalJSX.DcCouncilMemberList & JSXBase.HTMLAttributes<HTMLDcCouncilMemberListElement>;
            "dc-council-share": LocalJSX.DcCouncilShare & JSXBase.HTMLAttributes<HTMLDcCouncilShareElement>;
            "dc-council-template": LocalJSX.DcCouncilTemplate & JSXBase.HTMLAttributes<HTMLDcCouncilTemplateElement>;
        }
    }
}
