
import { ref } from 'vue'
const value = ref<string>('')
const level = ref<string>('')

export const msg = (_value: string, _level: string) => {
  value.value = _value
  try {
    level.value = _level
  } catch {
    level.value = 'info'
  }
  return { value, level }
}