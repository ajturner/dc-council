/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { CouncilTemplate, IAgency, ICommittee, ICommitteeMembers, IMember } from "./utils/types";
export namespace Components {
    interface DcCouncilAgencyCard {
        "agency": any;
    }
    interface DcCouncilAgencyList {
        "addAgency": (newAgencies: Array<IAgency>) => Promise<void>;
        "agencies": any[];
        "removeAgency": (removedAgency: IAgency) => Promise<void>;
    }
    interface DcCouncilCommitteeCard {
        "committee": ICommittee;
    }
    interface DcCouncilCommitteeList {
        "committees": Array<ICommittee>;
    }
    interface DcCouncilCommitteeMemberList {
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
        "memberFilename": string;
        "selectedPieces": string;
        "template": CouncilTemplate;
    }
    interface DcCouncilMemberCard {
        "member": any;
    }
    interface DcCouncilMemberList {
        /**
          * Maximum number of members allowed. Null or -1 means unlimited
         */
        "max": number;
        /**
          * Array of people in this list
         */
        "members": Array<IMember>;
        "position": string;
    }
    interface DcCouncilShare {
        "hideModal": () => Promise<void>;
        "open": boolean;
        "showModal": () => Promise<void>;
        "url": string;
    }
    interface DcCouncilTemplate {
        "hideModal": () => Promise<void>;
        "open": boolean;
        "showModal": () => Promise<void>;
        "template": string;
    }
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
        "dc-council-committee-card": HTMLDcCouncilCommitteeCardElement;
        "dc-council-committee-list": HTMLDcCouncilCommitteeListElement;
        "dc-council-committee-member-list": HTMLDcCouncilCommitteeMemberListElement;
        "dc-council-committee-placeholder": HTMLDcCouncilCommitteePlaceholderElement;
        "dc-council-dropzone": HTMLDcCouncilDropzoneElement;
        "dc-council-game": HTMLDcCouncilGameElement;
        "dc-council-member-card": HTMLDcCouncilMemberCardElement;
        "dc-council-member-list": HTMLDcCouncilMemberListElement;
        "dc-council-share": HTMLDcCouncilShareElement;
        "dc-council-template": HTMLDcCouncilTemplateElement;
    }
}
declare namespace LocalJSX {
    interface DcCouncilAgencyCard {
        "agency"?: any;
    }
    interface DcCouncilAgencyList {
        "agencies"?: any[];
        "onAgenciesChanged"?: (event: DcCouncilAgencyListCustomEvent<any>) => void;
    }
    interface DcCouncilCommitteeCard {
        "committee"?: ICommittee;
        "onCommitteeUpdated"?: (event: DcCouncilCommitteeCardCustomEvent<ICommittee>) => void;
        "onRemoveCommittee"?: (event: DcCouncilCommitteeCardCustomEvent<any>) => void;
    }
    interface DcCouncilCommitteeList {
        "committees"?: Array<ICommittee>;
    }
    interface DcCouncilCommitteeMemberList {
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
        "memberFilename"?: string;
        "selectedPieces"?: string;
        "template"?: CouncilTemplate;
    }
    interface DcCouncilMemberCard {
        "member"?: any;
    }
    interface DcCouncilMemberList {
        /**
          * Maximum number of members allowed. Null or -1 means unlimited
         */
        "max"?: number;
        /**
          * Array of people in this list
         */
        "members"?: Array<IMember>;
        "onMembersAdded"?: (event: DcCouncilMemberListCustomEvent<any>) => void;
        "position"?: string;
    }
    interface DcCouncilShare {
        "open"?: boolean;
        "url"?: string;
    }
    interface DcCouncilTemplate {
        "onTemplateSelected"?: (event: DcCouncilTemplateCustomEvent<string>) => void;
        "open"?: boolean;
        "template"?: string;
    }
    interface IntrinsicElements {
        "dc-council-agency-card": DcCouncilAgencyCard;
        "dc-council-agency-list": DcCouncilAgencyList;
        "dc-council-committee-card": DcCouncilCommitteeCard;
        "dc-council-committee-list": DcCouncilCommitteeList;
        "dc-council-committee-member-list": DcCouncilCommitteeMemberList;
        "dc-council-committee-placeholder": DcCouncilCommitteePlaceholder;
        "dc-council-dropzone": DcCouncilDropzone;
        "dc-council-game": DcCouncilGame;
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
            "dc-council-committee-card": LocalJSX.DcCouncilCommitteeCard & JSXBase.HTMLAttributes<HTMLDcCouncilCommitteeCardElement>;
            "dc-council-committee-list": LocalJSX.DcCouncilCommitteeList & JSXBase.HTMLAttributes<HTMLDcCouncilCommitteeListElement>;
            "dc-council-committee-member-list": LocalJSX.DcCouncilCommitteeMemberList & JSXBase.HTMLAttributes<HTMLDcCouncilCommitteeMemberListElement>;
            "dc-council-committee-placeholder": LocalJSX.DcCouncilCommitteePlaceholder & JSXBase.HTMLAttributes<HTMLDcCouncilCommitteePlaceholderElement>;
            "dc-council-dropzone": LocalJSX.DcCouncilDropzone & JSXBase.HTMLAttributes<HTMLDcCouncilDropzoneElement>;
            "dc-council-game": LocalJSX.DcCouncilGame & JSXBase.HTMLAttributes<HTMLDcCouncilGameElement>;
            "dc-council-member-card": LocalJSX.DcCouncilMemberCard & JSXBase.HTMLAttributes<HTMLDcCouncilMemberCardElement>;
            "dc-council-member-list": LocalJSX.DcCouncilMemberList & JSXBase.HTMLAttributes<HTMLDcCouncilMemberListElement>;
            "dc-council-share": LocalJSX.DcCouncilShare & JSXBase.HTMLAttributes<HTMLDcCouncilShareElement>;
            "dc-council-template": LocalJSX.DcCouncilTemplate & JSXBase.HTMLAttributes<HTMLDcCouncilTemplateElement>;
        }
    }
}
