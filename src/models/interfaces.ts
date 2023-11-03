export interface Plan {
  title: string
  tasks: {
    name: string
    desc: string
    color: string
    estimated: number
  }[]
}