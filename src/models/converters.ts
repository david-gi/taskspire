import { Board, Item } from '../models/classes'
import { IPlan } from '../models/interfaces'

export const planToBoard = (plan: IPlan) => {
  const items: Item[] = plan.tasks.map(t => {
    const item = new Item(t.name, t.desc)
    item.estimated = t.estimated
    return item
  })

  const board = new Board()
  board.name = plan.title
  board.stages[0].items = items

  return board
}