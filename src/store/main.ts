import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '../http/axios-base'
import H from './helpers'
import { Board } from '../models/board'
import { useBoardStore } from './board'

export const useMainStore = defineStore('main', () => {
  const boardStore = useBoardStore()
  const keyName = 'taskspire-board-ids'
  const boardIds = ref<string[]>([])


  function fetchBoardIds() {
    return H.wrapAttempt(() => {
      const stored = localStorage.getItem(keyName)
      if (stored != null) boardIds.value = <string[]>JSON.parse(stored)
    })
  }

  function saveBoardIds() {
    if (boardIds.value === undefined) return
    return H.wrapAttempt(() => {
      localStorage.setItem(keyName, JSON.stringify(boardIds.value))
    })
  }

  async function createNewBoard(goal: string) {
    return await api.ai
      .post('/make', goal)
      .then((res) => {
        const data = res.data //parse response
        boardStore.currentBoard = new Board(data)
        boardIds.value.push(boardStore.currentBoard.id)
        saveBoardIds()
      })
      .catch((e) => console.error(e))
  }

  return {
    boardIds,

    fetchBoardIds,
    saveBoardIds,
    createNewBoard,
  }
})
