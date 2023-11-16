<script setup lang='ts'>
import { useI18n } from 'vue-i18n'
import { useGtag, } from 'vue-gtag-next'
import { useHomeStore } from '../../store/home'
import { useMessageStore } from '../../store/message'
import { Board } from '../../models/classes'
import { IBoard } from '../../models/interfaces'
import DefaultButton from '../base/DefaultButton.vue'
import SafetyButton from '../base/SafetyButton.vue'
import ProgressBar from '../common/ProgressBar.vue'

const props = defineProps<{ board: IBoard }>()

const { t } = useI18n()
const gtag = useGtag()
const homeStore = useHomeStore()
const messageStore = useMessageStore()

function deleteGoal() {
  try {
    homeStore.deleteBoard(props.board.id)
    messageStore.show(t('message.deleteGoalSuccess'), 'info')
    gtag.event('delete_goal')
  } catch (e) {
    messageStore.show(t('message.deleteGoalError'), 'warning')
  }
}
</script>

<template>
  <div
    style=""
    class="h-auto w-full sm:w-3/4 md:w-2/5 xl:w-3/12 sm:mx-6 mx-2
           text-center backdrop-grayscale contrast-125
           shadow-lg rounded ring-2 ring-gray-dark"
  >
    <progress-bar
      class=""
      :value="(board as Board).calculateProgress()"
    />
    <div class="p-2 pb-6 mb-4 bg-gray backdrop-brightness-50">
      <default-button
        :text="$t('button.openGoal')"
        theme="x"
        class="float-left px-4 saturate-50 brightness-75"
        :active="true"
        @click="homeStore.setBoard(board.id)"
      />
      <safety-button
        class="float-right saturate-50 brightness-75"
        :text="$t('button.delete')"
        @fired="deleteGoal"
      />
      <br>
    </div>
    <div
      class="line-clamp-2 text-xl text-orange mt-6 mb-2 cursor-pointer select-none hover:contrast-200"
      @click="homeStore.setBoard(board.id)"
    >
      {{ board.name }}
    </div>
    <div class="text-orange/75 text-md mb-6 px-4 select-all">
      {{ board.goal }}
    </div>
  </div>
</template>


