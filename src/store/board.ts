import { ref } from 'vue'
import { defineStore } from 'pinia'
//import { api } from '../http/axios-base'
import { Board, Item } from '../models/board'

const wrapAttempt = (func: () => void) => {
  try {
    func()
    return true
  } catch (e) {
    console.error(e)
    return false
  }
}

export const useBoardStore = defineStore('board', () => {
  const currentBoardId = ref<string>('tavle-board')
  const currentBoard = ref<Board>({
    id: currentBoardId.value ?? '',
    stages: [
      { name: 'To-Do', items: [] },
      { name: 'In-Progress', items: [] },
      { name: 'Done', items: [] },
    ]
  })
  const selectedStageIndex = ref<number>(-1)
  const selectedItemIndex = ref<number>(-1)
  const selectedItem = ref<Item | null>(null)
  const draggedItemId = ref<string>('')
  const ready = ref<boolean>(false)

  function fetch() {
    if (currentBoardId.value === undefined) return
    ready.value = false
    return wrapAttempt(() => {
      const stored = localStorage.getItem(currentBoardId.value ?? '')
      if (stored != null) currentBoard.value = <Board>JSON.parse(stored)
      ready.value = true
    })
  }

  function save() {
    if (currentBoardId.value === undefined) return
    return wrapAttempt(() => {
      localStorage.setItem(currentBoardId.value ?? '', JSON.stringify(currentBoard.value))
    })
  }

  function setSelectedItem(id?: string) {
    if (id === undefined) {
      selectedStageIndex.value = -1
      selectedItemIndex.value = -1
      selectedItem.value = null
      return
    }

    currentBoard.value.stages.forEach((stage, stageIndex) => {
      stage.items.forEach((item, itemIndex) => {
        if (item.id === id) {
          selectedStageIndex.value = stageIndex
          selectedItemIndex.value = itemIndex
          selectedItem.value = item
        }
      })
    })
  }

  //#region Alternate API actions

  // async function fetchWithApi() {
  //   // If using an api backend:
  //   ready.value = false
  //   return await api
  //     .get('/board')
  //     .then((res) => {
  //       currentBoard.value = <Board>res.data.results
  //       ready.value = true
  //     })
  //     .catch((e) => console.error(e))
  // }

  // async function saveWithApi() {
  //   // If using an api backend:
  //   ready.value = false
  //   return await api
  //     .post('/board/update', currentBoard.value)
  //     .then(() => {
  //       ready.value = true
  //     })
  //     .catch((e) => console.error(e))
  // }

  //#endregion

  return {
    currentBoardId,
    currentBoard,
    selectedStageIndex,
    selectedItemIndex,
    selectedItem,
    draggedItemId,
    ready,

    fetch,
    save,
    setSelectedItem,
  }
})
