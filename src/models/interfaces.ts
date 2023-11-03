export interface IPlan {
  title: string
  tasks: {
    name: string
    desc: string
    color: string
    estimated: number
  }[]
}
export interface IRecommendation {
  text: string,
  url: string,
}
export interface IBoard {
  id: string
  name: string
  goal: string
  stages: IStage[]
}
export interface IStage {
  name: string
  items: IItem[]
}
export interface IItem {
  id: string
  name: string
  desc: string
  color: Colors
  completed: number
  estimated: number
  recommendation?: IRecommendation
  updated: number
  created: number
}

export interface IRecommendation {
  text: string
  url: string
}
export interface IRecommendationLink {
  Affiliate: string
  Name: string
  Url: string
  Description: string
  Enabled: boolean
}

export interface ICustomSettings {
  Model: string
  Temperature: number
  RecommendationModel: string
  RecommendationTemperature: number
  MaxTokens: number
  Persona: string
  UserPlansPerHour: number
}

export interface IAdminData {
  Settings: ICustomSettings
  Links: IRecommendationLink[]
}


export enum Colors {
  blue = 'blue',
  green = 'green',
  orange = 'orange',
  pink = 'pink'
}