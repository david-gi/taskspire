<script setup lang='ts'>
import { useI18n } from 'vue-i18n'
import { useGtag, } from 'vue-gtag-next'
import { useHomeStore } from '../../store/home'
import { useMessageStore } from '../../store/message'
import DefaultButton from '../base/DefaultButton.vue'
import SafetyButton from '../base/SafetyButton.vue'
import ProgressBar from '../base/ProgressBar.vue'
import { Board } from '../../models/classes'
import { IBoard } from '../../models/interfaces'

const props = defineProps<{ board: IBoard }>()

const { t } = useI18n()
const gtag = useGtag()
const homeStore = useHomeStore()
const messageStore = useMessageStore()

function deleteGoal() {
  try {
    homeStore.deleteBoard(props.board.id)
    messageStore.show(t('message.deleteGoalSuccess'), 'info')
    gtag.event('delete-goal')
  } catch (e) {
    messageStore.show(t('message.deleteGoalError'), 'warning')
  }
}
</script>

<template>
  <div
    style=""
    class="h-auto w-full sm:w-3/4 md:w-2/5 xl:w-3/12 sm:mx-6 mx-0 p-9
           text-center bg-gray-dark contrast-125 saturate-150
           shadow-lg rounded ring-2 ring-gray-dark"
  >
    <default-button
      :text="$t('button.openGoal')"
      theme="x"
      class="absolute top-0 left-0 px-4"
      :active="true"
      @click="homeStore.setBoard(board.id)"
    />
    <safety-button
      class="absolute top-0 right-0 saturate-50 brightness-75"
      :text="$t('button.delete')"
      @fired="deleteGoal"
    />
    <div
      class="line-clamp-2 text-xl text-orange mt-6 mb-2 cursor-pointer select-none hover:contrast-200"
      @click="homeStore.setBoard(board.id)"
    >
      {{ board.name }}
    </div>
    <div class="text-orange/75 text-md mb-9 select-all">
      {{ board.goal }}
    </div>
    <progress-bar
      class="-ml-9"
      :value="(board as Board).calculateProgress()"
    />
  </div>
</template>


