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
  agencies?:Array<string>
  chair?: string
  members?: Array<string>
  link?:string
}

export interface IAgency {
  code:string
  name:string
  cluster:string
  budget:string
  link:string
}