import { ref } from 'vue'
import { defineStore } from 'pinia'
import { Board, Item } from '../models/classes'
import H from './helpers'

export const useBoardStore = defineStore('board', () => {
  const currentBoard = ref<Board>()
  const selectedStageIndex = ref<number>(-1)
  const selectedItemIndex = ref<number>(-1)
  const selectedItem = ref<Item>()
  const draggedItemId = ref<string>('')

  function save() {
    if (!currentBoard.value) return
    return H.wrapAttempt(() => {
      localStorage.setItem(currentBoard.value?.id ?? '', JSON.stringify(currentBoard.value))
    })
  }

  function setSelectedItem(id?: string) {
    if (id === undefined) {
      selectedStageIndex.value = -1
      selectedItemIndex.value = -1
      selectedItem.value = undefined
      return
    }

    currentBoard.value?.stages.forEach((stage, stageIndex) => {
      stage.items.forEach((item: Item, itemIndex: number) => {
        if (item.id === id) {
          selectedStageIndex.value = stageIndex
          selectedItemIndex.value = itemIndex
          selectedItem.value = item
        }
      })
    })
  }


  return {
    currentBoard,
    selectedStageIndex,
    selectedItemIndex,
    selectedItem,
    draggedItemId,

    save,
    setSelectedItem,
  }
})
