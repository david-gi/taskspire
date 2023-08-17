import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '../http/axios-base'
import H from './helpers'
import { Board } from '../models/board'
import { useBoardStore } from './board'

export const useMainStore = defineStore('main', () => {
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

          const board = Object.assign(new Board(), JSON.parse(storedBoard))
          boards.value.push(board)
        }
      })
    })
  }

  function saveBoardIds() {
    return H.wrapAttempt(() => {
      const boardIds = boards.value.map((b) => b.id)
      boardIds.push('taskspire-dfc65736-8b69-4304-822e-75d66649e9ee')
      boardIds.push('taskspire-22aa8b53-904b-4f51-871f-426fee7060d9')
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
    return await api.ai
      .post('/make', goal)
      .then((res) => {
        const newBoard = Object.assign(new Board(), JSON.parse(res.data))
        boards.value.push(newBoard)
        boardStore.currentBoard = newBoard
        saveBoardIds()
      })
      .catch((e) => console.error(e))
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
