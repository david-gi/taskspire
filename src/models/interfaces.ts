export interface IPlan {
  title: string
  tasks: {
    name: string
    desc: string
    color: string
    estimated: number
  }[]
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
  color: string
  completed: number
  estimated: number
  updated: number
  created: number
}