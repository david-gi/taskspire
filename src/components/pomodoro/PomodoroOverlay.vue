<script setup lang="ts">
import { toRefs, ref, computed, watch, onMounted } from 'vue'
import { usePomodoroStore } from '../../store/pomodoro'
import SafetyButton from '../base/SafetyButton.vue'

const pomodoroStore = usePomodoroStore()
const { pomodoroStart, pomodoroTime, itemName } = toRefs(pomodoroStore)

const timer = ref<NodeJS.Timeout>()
const index = ref<number>(0)
const limit = ref<number>(0)
const len = ref<number>(0)
const cutoff = 28

const marquee = computed(() => {
  if (len.value <= cutoff) return itemName.value
  return (itemName.value ?? '').substring(index.value, cutoff + index.value)
})

function startInterval() {
  len.value = (itemName.value ?? '').length
  limit.value = len.value - cutoff
  timer.value = setInterval(() => {
    index.value++
    if (index.value > limit.value + 15) index.value = -3
  }, 200)
}

function resetPomodoro() {
  index.value = 0
  clearInterval(timer.value)
  pomodoroStore.cancelPomodoro()
}

onMounted(() => {
  startInterval()
})

watch(() => pomodoroStart.value, () => {
  if (pomodoroStart.value) {
    startInterval()
  }
})
</script>

<template>
  <div
    v-show="pomodoroStart"
    class="w-72 sm:w-96 absolute top-0 right-0 z-50 overflow-clip
          bg-gray-dark border-4 border-pink saturate-50 contrast-125
          rounded-bl-lg shadow-xl shadow-gray-dark"
  >
    <div class="text-right select-none">
      <div class="w-2 h-4 text-yellow float-left pl-2 pt-2 text-md whitespace-nowrap">
        {{ marquee }}
      </div>
      <div class="text-orange inline-block px-3 pt-1 bg-gray-dark">
        <span class="text-2xl text-bold animate-pulse">{{ pomodoroTime }}</span>
        <span class="text-sm">min</span>
      </div>
      <safety-button
        text="✖"
        class="float-right text-bold bg-pink"
        @fired="resetPomodoro"
      />
    </div>
  </div>
</template>

