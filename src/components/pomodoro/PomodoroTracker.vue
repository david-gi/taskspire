<script setup lang="ts">
import { computed, toRefs } from 'vue'
import { Item } from '../../models/classes'
import { usePomodoroStore } from '../../store/pomodoro'
import PomodoroTimer from './PomodoroTimer.vue'

const props = defineProps({
  item: { type: Item, required: true }
})

const pomodoroStore = usePomodoroStore()
const { pomodoroStart } = toRefs(pomodoroStore)

const completed = computed(() => {
  let res = ''
  for (let i = 0; i < props.item.cycles; i++) {
    res += '⌚ '
  }
  return res
})
const estimated = computed(() => {
  let res = ''
  for (let i = 0; i < 10 - props.item.cycles; i++) {
    res += '⌚ '
  }
  return res
})

</script>

<template>
  <div class="w-full">
    <label class="font-bold">Pomodoro Completion</label>
    <div class="select-none">
      <span class="text-pink saturate-50 contrast-125 text-4xl">{{ completed }}</span>
      <span class="text-gray-light/50 text-4xl">{{ estimated }}</span>
      <pomodoro-timer
        v-if="!pomodoroStart"
        :item="item"
        class="float-right"
      />
    </div>
  </div>
</template>

