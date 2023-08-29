import { ref } from 'vue'
import { defineStore } from 'pinia'
import { Stage, Item } from '../models/classes'
import { useBoardStore } from './board'

export const usePomodoroStore = defineStore('pomodoro', () => {
  const pomodoroStart = ref<number>()
  const pomodoroTime = ref<number>(25)
  const itemName = ref<string>()
  const timer = ref<NodeJS.Timeout>()

  const boardStore = useBoardStore()

  function refreshPomodoroTime() {
    if (pomodoroStart.value === undefined) return 0
    pomodoroTime.value = 25 - Math.floor((new Date().getTime() - pomodoroStart.value) / 1000 / 60)
  }

  function initPomodoro(): boolean {
    if (pomodoroStart.value) return false
    pomodoroStart.value = new Date().getTime()
    pomodoroTime.value = 25
    return true
  }

  function createPomodoro(id: string) {
    if (initPomodoro()) {
      let item: Item
      boardStore.currentBoard?.stages
        .forEach((stage: Stage) => {
          stage.items.forEach((_item: Item) => {
            if (_item.id === id) {
              item = _item
              itemName.value = _item.name
            }
          })
        })

      timer.value = setInterval(() => {
        refreshPomodoroTime()
        if (pomodoroTime.value <= 0) {
          item.completed = (item.completed ?? 0) + 1
          cancelPomodoro()
        }
      }, 1000)
      return true
    }
    return false
  }

  function cancelPomodoro() {
    pomodoroStart.value = undefined
    clearInterval(timer.value)
    timer.value = undefined
  }

  return {
    pomodoroStart,
    pomodoroTime,
    itemName,
    timer,

    createPomodoro,
    cancelPomodoro,
  }
})
