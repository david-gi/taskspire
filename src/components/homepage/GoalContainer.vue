<script setup lang='ts'>
import { watch, toRefs, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useHomeStore } from '../../store/home'
import { useBoardStore } from '../../store/board'
import { useMessageStore } from '../../store/message'

import GoalRecord from './GoalRecord.vue'
import LinkButton from '../base/LinkButton.vue'
import RestoreButton from './RestoreButton.vue'

const { t } = useI18n()
const homeStore = useHomeStore()
const { boards } = toRefs(homeStore)
const boardStore = useBoardStore()
const { currentBoard } = toRefs(boardStore)
const messageStore = useMessageStore()

async function restoreFromUpload(file: File) {
  try {
    await homeStore.restoreFromFile(file)
    messageStore.show(t('message.restoredSuccess'), 'info')
  } catch (e) {
    messageStore.show(t('message.restoredError'), 'warning')
  }
}

function getBackupFilename() {
  const now = new Date(Date.now())
  return t('homepage.yourGoals').replace(/\s/g, '-') + '-'
    + t('button.backup').replace(/\s/g, '-') + '('
    + now.getFullYear() + '-'
    + now.getMonth() + '-'
    + now.getDate() + '@'
    + now.getHours() + '-' + now.getMinutes()
    + ').xml'
}

onMounted(() => homeStore.loadBoards())
watch(currentBoard, () => homeStore.loadBoards())
</script>

<template>
  <div class="pb-6 bg-gradient-to-b from-blue/30 to-gray-transparent to-80%">

    <div v-if="boards && boards.length > 0">
      <div class="py-6 shadow-xl">
        <span class="sm:text-2xl text-lg font-bold">
          {{ $t('homepage.yourGoals') }}
        </span>
      </div>
      <div class="flex flex-row flex-wrap gap-6 justify-center pt-6">
        <div class="mx-20 opacity-80">{{ $t('homepage.backupReminder') }}</div>
        <div class="h-auto w-full flex flex-row gap-9 justify-center ">
          <restore-button
            :text="$t('button.restore')"
            :message="$t('message.restoreWarning')"
            @upload="restoreFromUpload"
          />
          <link-button
            :text="$t('button.backup')"
            :href="homeStore.getBackupLink()"
            :download="getBackupFilename()"
          />
        </div>
        <goal-record
          v-for=" board  in  boards "
          :key="board.id + Math.random()"
          :board="board"
        />
      </div>
    </div>

    <div
      v-else
      class="w-full px-4 py-24"
    >
      <restore-button
        :text="$t('button.restore')"
        :message="$t('message.restoreWarning')"
        @upload="restoreFromUpload"
      />
    </div>

  </div>
</template>


