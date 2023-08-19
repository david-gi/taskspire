<script setup lang="ts">
import { toRefs, computed } from 'vue'
import { Item } from '../../models/board'
import { usePomodoroStore } from '../../store/pomodoro'
import { alert } from 'src/composables/alert'
import DefaultButton from './DefaultButton.vue'

const props = defineProps({
  item: { type: Item, required: true }
})
const { item } = toRefs(props)

const pomodoroStore = usePomodoroStore()

const btnText = computed(() => '⌚ Start a Pomodoro')

function startPomodoro() {
  if (pomodoroStore.createPomodoro(item.value.id)) {
    alert('Pomodoro started!', 'success')
  } else {
    alert('Pomodoro already started!', 'error')
  }
}
</script>

<template>
  <default-button
    :text="btnText"
    theme="evil"
    :rounded="false"
    class="rounded-full px-4 saturate-50 contrast-125"
    @click="startPomodoro"
  />
</template>

