<script setup lang="ts">
import { computed, toRefs } from 'vue'
import { IItem } from '../../models/interfaces'
import { usePomodoroStore } from '../../store/pomodoro'
import PomodoroButton from './PomodoroButton.vue'

const props = defineProps<{ item: IItem, buttonless: boolean }>()

const pomodoroStore = usePomodoroStore()
const { pomodoroStart } = toRefs(pomodoroStore)

const completed = computed(() => {
  let res = ''
  for (let i = 0; i < props.item.completed; i++) {
    res += '⌚ '
  }
  return res
})
const estimated = computed(() => {
  let res = ''
  for (let i = 0; i < props.item.estimated - props.item.completed; i++) {
    res += '⌚ '
  }
  return res
})

</script>

<template>
  <div class="w-full">
    <label class="font-bold">{{ $t('input.labelPomodoroCompletion') }}</label>
    <div class="select-none">
      <span class="text-pink saturate-50 contrast-125 text-4xl">{{ completed }}</span>
      <span class="text-gray-light/50 text-4xl">{{ estimated }}</span>
      <pomodoro-button
        v-if="!pomodoroStart && !buttonless"
        :item="item"
        class="float-right"
      />
    </div>
  </div>
</template>

