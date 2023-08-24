import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '../http/api'
import H from './helpers'
import { Board } from '../models/classes'
import { Plan } from '../models/interfaces'
import { planToBoard } from '../models/converters'
import { useBoardStore } from './board'

export const useHomeStore = defineStore('home', () => {
  const boardStore = useBoardStore()
  const idsKey = 'taskspire-board-ids'
  const boards = ref<Board[]>([])


  function fetchBoards() {
    return H.wrapAttempt(() => {
      const storedIds = localStorage.getItem(idsKey)
      if (storedIds == null) return
      const boardIds = <string[]>JSON.parse(storedIds)
      boards.value = []
      boardIds.forEach((id) => {
        const storedBoard = localStorage.getItem(id)
        if (storedBoard != null) {
          const board: Board = Object.assign(new Board(), JSON.parse(storedBoard))
          boards.value.push(board)
        }
      })
    })
  }

  function saveBoardIds() {
    return H.wrapAttempt(() => {
      const boardIds = boards.value.map((b) => b.id)
      localStorage.setItem(idsKey, JSON.stringify(boardIds))
    })
  }

  function deleteBoard(id: string) {
    return H.wrapAttempt(() => {
      boards.value = boards.value.filter((b) => b.id !== id)
      localStorage.removeItem(id)
      saveBoardIds()
    })
  }

  async function createNewBoard(goal: string) {
    return H.wrapAttempt(async () => {
      const res = await api.buildPlan(goal)
      const plan: Plan = res.data
      const board = planToBoard(plan)
      board.goal = goal
      boards.value.push(board)
      boardStore.currentBoard = board
      boardStore.save()
      saveBoardIds()
    })
  }

  async function setBoard(id?: string) {
    if (id === undefined) boardStore.currentBoard = undefined
    const board = boards.value.find((b) => b.id === id)
    boardStore.currentBoard = board
  }

  return {
    boards,

    fetchBoards,
    saveBoardIds,
    deleteBoard,
    createNewBoard,
    setBoard
  }
})
