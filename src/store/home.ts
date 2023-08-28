import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '../http/api'
import H from './helpers'
import { Board } from '../models/classes'
import { IPlan } from '../models/interfaces'
import { planToBoard } from '../models/converters'
import { useBoardStore } from './board'
import { useMessageStore } from './message'

export const useHomeStore = defineStore('home', () => {
  const boardStore = useBoardStore()
  const messageStore = useMessageStore()
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
    try {
      const res = await api.buildPlan(goal)
      try {
        const plan: IPlan = res.data
        const board: Board = planToBoard(plan)
        board.goal = goal
        boards.value.push(board)
        boardStore.currentBoard = board
        boardStore.save()
        saveBoardIds()
      } catch (e) { throw 'API error: No plan returned' }
    } catch (e) {
      console.error(e)
      messageStore.show('Error: Review your description or try again later.', 'error')
    }
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
