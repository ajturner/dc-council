export interface IMember {
  name:string
  role:string
  elected: number
  termstart: number
  termend: number
  affiliation: string
  link:string
}

export interface ICommittee {
  id:string
  name?:string
  description?:string
  agencies?:Array<IAgency>
  link?:string
  members?: ICommitteeMembers
}
export interface ICommitteeMembers {
  chair?: IMember
  members?: Array<IMember>
}
export interface IAgency {
  code:string
  name:string
  cluster:string
  budget:string
  link:string
}