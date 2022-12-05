export interface IMember {
  name:string
  role:string
  elected: number
  termstart: number
  termend: number
  affiliation: string
  link:string
  photo:string
}

export interface ICouncil {
  id?:string
  name?:string
  description?:string
  committees: ICommittee[]
}

export interface ICommittee {
  id:string
  name?:string
  description?:string
  agencies?:Array<IAgency>
  link?:string
  members?: ICommitteeMembers
  editable?: boolean
}
export interface ICommitteeMembers {
  chair?: Array<IMember>
  members?: Array<IMember>
}
export interface IAgency {
  code:string
  name:string
  acronym:string
  description:string
  cluster:string
  budget:string
  link:string
  group:string
  committee?:string // ref which committee manages this agency
  type:string
}

export enum CouncilTemplate {
  current = 'current',
  blank = 'blank',
  saved = 'saved',
}

export enum CardAction {
  add = 'add',
  remove = 'remove',
  none = 'none'
}