<script setup lang='ts'>
import { useGtag, } from 'vue-gtag-next'
import { useHomeStore } from '../../store/home'
import DefaultButton from '../base/DefaultButton.vue'
import SafetyButton from '../base/SafetyButton.vue'
import ProgressBar from '../base/ProgressBar.vue'
import { Board } from '../../models/classes'
import { IBoard } from '../../models/interfaces'

const props = defineProps<{ board: IBoard }>()

const gtag = useGtag()
const homeStore = useHomeStore()

function deleteGoal() {
  homeStore.deleteBoard(props.board.id)
  gtag.event('delete-goal')
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
    <ProgressBar
      class="-ml-9"
      :value="(board as Board).calculateProgress()"
    />
  </div>
</template>


