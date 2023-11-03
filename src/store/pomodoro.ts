import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useGtag, } from 'vue-gtag-next'
import H from './helpers'
import { Stage, Item } from '../models/classes'
import { useBoardStore } from './board'

export const usePomodoroStore = defineStore('pomodoro', () => {
  const pomodoroStart = ref<number>()
  const pomodoroTime = ref<number>(25)
  const itemName = ref<string>()
  const timer = ref<NodeJS.Timeout>()

  const gtag = useGtag()
  const boardStore = useBoardStore()

  function refreshPomodoroTime() {
    if (pomodoroStart.value === undefined) return 0
    pomodoroTime.value = 25 - Math.floor((new Date().getTime() - pomodoroStart.value) / 1000 / 60)
  }

  function initPomodoro() {
    pomodoroStart.value = new Date().getTime()
    pomodoroTime.value = 25
  }

  function createPomodoro(id: string) {
    H.wrapAttempt(() => {
      initPomodoro()

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
          gtag.event('pomodoro-completion')
          cancelPomodoro()
        }
      }, 1000)
    })
  }

  function cancelPomodoro() {
    H.wrapAttempt(() => {
      pomodoroStart.value = undefined
      clearInterval(timer.value)
      timer.value = undefined
    })
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
