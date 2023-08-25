<script setup lang="ts">
import { toRefs, computed } from 'vue'
import { IItem } from '../../models/interfaces'

import { usePomodoroStore } from '../../store/pomodoro'
import { msg } from '../../composables/msg'
import DefaultButton from '../base/DefaultButton.vue'

const props = defineProps<{ item: IItem }>()
const { item } = toRefs(props)

const pomodoroStore = usePomodoroStore()

const btnText = computed(() => '⌚ Start a Pomodoro')

function startPomodoro() {
  if (pomodoroStore.createPomodoro(item.value.id)) {
    msg('Pomodoro started!', 'success')
  } else {
    msg('Pomodoro already started!', 'error')
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

