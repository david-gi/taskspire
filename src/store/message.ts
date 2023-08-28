import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useMessageStore = defineStore('message', () => {
  const levelDetails = [
    {
      key: 'info',
      color: 'blue',
      delay: 2000,
    },
    {
      key: 'success',
      color: 'green',
      delay: 2000,
    },
    {
      key: 'warning',
      color: 'yellow',
      delay: 3000,
    },
    {
      key: 'error',
      color: 'pink',
      delay: 10000,
    }
  ]

  const message = ref<string>('')
  const level = ref<{ key: string, color: string, delay: number }>(levelDetails[0])
  const timer = ref<NodeJS.Timeout>()

  function show(_value: string, _level: string) {
    message.value = _value
    try {
      level.value = levelDetails.find((d) => d.key === _level) ?? levelDetails[0]
    } catch {
      level.value = levelDetails[0]
    }
    timer.value = setTimeout(() => clear(), level.value.delay)
  }

  function clear() {
    message.value = ''
    clearTimeout(timer.value)
  }

  return {
    message,
    level,

    show,
    clear,
  }
})
