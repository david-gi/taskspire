<script setup lang="ts">
import { toRefs } from 'vue'
import { IItem } from '../../models/interfaces'

import { usePomodoroStore } from '../../store/pomodoro'
import { useMessageStore } from '../../store/message'
import DefaultButton from '../base/DefaultButton.vue'
import { useI18n } from 'vue-i18n'

const props = defineProps<{ item: IItem }>()
const { item } = toRefs(props)

const { t } = useI18n()
const pomodoroStore = usePomodoroStore()
const messageStore = useMessageStore()

function startPomodoro() {
  if (pomodoroStore.createPomodoro(item.value.id)) {
    messageStore.show(t('message.pomodoroStarted'), 'success')
  } else {
    messageStore.show(t('message.pomodoroAlreadyStarted'), 'error')
  }
}
</script>

<template>
  <default-button
    :text="'⌚ ' + $t('button.startPomodoro')"
    theme="evil"
    :rounded="false"
    class="rounded-full px-4 saturate-50 contrast-125"
    @click="startPomodoro"
  />
</template>

