import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '../http/api'
import H from './helpers'
import { Board } from '../models/classes'
import { IPlan } from '../models/interfaces'
import { planToBoard } from '../models/converters'
import { useBoardStore } from './board'

export const useHomeStore = defineStore('home', () => {
  const boardStore = useBoardStore()
  const idsKey = 'kanbandoro-board-ids'
  const boards = ref<Board[]>([])
  const cookiesStatusKey = 'kanbandoro-cookie-status'
  const cookiesAccepted = ref<boolean>()

  function loadBoards() {
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

  async function createNewBoard(goal: string, stageNames: string[]) {
    try {
      const res = await api.buildPlan(goal)
      try {
        const plan: IPlan = res.data
        const board: Board = planToBoard(plan)
        board.goal = goal
        stageNames.forEach((n, i) => board.stages[i].name = n)
        board.setColors()

        boards.value.push(board)
        boardStore.currentBoard = board
        boardStore.save()
        saveBoardIds()
        return true
      } catch (e) {
        console.error(e)
        throw 'API error: No plan returned'
      }
    } catch (e) {
      console.error(e)
      return false
    }
  }

  async function setBoard(id?: string) {
    if (id === undefined) boardStore.currentBoard = undefined
    const board = boards.value.find((b) => b.id === id)
    boardStore.currentBoard = board
  }

  function loadCookieStatus() {
    return H.wrapAttempt(() => {
      const cStatus = localStorage.getItem(cookiesStatusKey)
      if (cStatus) cookiesAccepted.value = (cStatus === 'true')
    })
  }

  function saveCookieStatus(val: boolean) {
    return H.wrapAttempt(() => {
      cookiesAccepted.value = val
      localStorage.setItem(cookiesStatusKey, cookiesAccepted.value ? 'true' : 'false')
    })
  }

  return {
    boards,
    cookiesAccepted,

    loadBoards,
    saveBoardIds,
    deleteBoard,
    createNewBoard,
    setBoard,
    loadCookieStatus,
    saveCookieStatus,
  }
})
