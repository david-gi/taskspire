import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '../server/api'
import H from './helpers'
import { Board } from '../models/classes'
import { IBoard, IPlan } from '../models/interfaces'
import { planToBoard } from '../models/converters'
import { useBoardStore } from './board'

export const useHomeStore = defineStore('home', () => {
  const baseName = 'taskspire'
  const idsKey = baseName + '-board-ids'
  const goalIdKey = baseName + '-goal-'
  const cookiesStatusKey = baseName + '-cookie-status'
  const boardStore = useBoardStore()

  const language = ref<string>()
  const boards = ref<Board[]>([])
  const cookiesAccepted = ref<boolean>()

  function localStorageCheck() {
    try {
      localStorage.setItem('x', 'x')
      const x = localStorage.getItem('x')
      if (x !== 'x') throw 'No local storage'
      localStorage.removeItem('x')
      return true
    } catch (e) {
      console.log(e)
      return false
    }
  }

  function loadBoards() {
    H.wrapAttempt(() => {
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
    const boardIds = boards.value.map((b) => b.id)
    localStorage.setItem(idsKey, JSON.stringify(boardIds))
  }

  function saveBoards() {
    if (boards.value) {
      boards.value.forEach(board => {
        boardStore.saveBoard(board)
      })
      saveBoardIds()
    }
  }

  function deleteBoard(id: string) {
    H.wrapAttempt(() => {
      boards.value = boards.value.filter((b) => b.id !== id)
      localStorage.removeItem(id)
      saveBoardIds()
    })
  }

  async function createNewBoard(goal: string, stageNames: string[]) {
    const res = await api.buildPlan(goal, language.value)

    const plan: IPlan = res.data
    const board: Board = planToBoard(plan)
    board.id = goalIdKey + board.id
    board.goal = goal
    stageNames.forEach((n, i) => board.stages[i].name = n)
    board.setColors()

    boards.value.push(board)
    boardStore.currentBoard = board
    boardStore.saveCurrent()
    saveBoardIds()
  }

  function setBoard(id?: string) {
    H.wrapAttempt(() => {
      if (id === undefined) boardStore.currentBoard = undefined
      const board = boards.value.find((b) => b.id === id)
      boardStore.currentBoard = board
    })
  }

  async function restoreFromFile(file: File) {
    H.wrapAttempt(async () => {
      const text = await file.text()
      const restoredBoards = <IBoard[]>JSON.parse(text)
      const tempBoards = boards.value

      try {
        boards.value.forEach(board => deleteBoard(board.id))

        boards.value = restoredBoards.map(board => Object.assign(new Board(), board))
        saveBoards()
      } catch (e) {
        boards.value = tempBoards
        saveBoards()
        throw e
      }
    })
  }

  function getBackupLink(): string {
    return H.wrapAttempt(() => {
      if (boards.value.length == 0) return

      const boardsString = JSON.stringify(boards.value as IBoard[])
      return 'data:text/plain;charset=utf-8,' + encodeURIComponent(boardsString)
    })
  }

  function loadCookieStatus() {
    H.wrapAttempt(() => {
      const cStatus = localStorage.getItem(cookiesStatusKey)
      if (cStatus) cookiesAccepted.value = (cStatus === 'true')
    })
  }

  function saveCookieStatus(val: boolean) {
    H.wrapAttempt(() => {
      cookiesAccepted.value = val
      localStorage.setItem(cookiesStatusKey, cookiesAccepted.value ? 'true' : 'false')
    })
  }

  return {
    language,
    boards,
    cookiesAccepted,

    localStorageCheck,
    loadBoards,
    saveBoardIds,
    deleteBoard,
    createNewBoard,
    setBoard,
    restoreFromFile,
    getBackupLink,
    loadCookieStatus,
    saveCookieStatus,
  }
})
