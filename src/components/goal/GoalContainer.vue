<script setup lang='ts'>
import { watch, toRefs, onMounted } from 'vue'
import { useHomeStore } from '../../store/home'
import { useBoardStore } from '../../store/board'
import DefaultButton from '../base/DefaultButton.vue'
import SafetyButton from '../base/SafetyButton.vue'
import ProgressBar from '../base/ProgressBar.vue'

const homeStore = useHomeStore()
const { boards } = toRefs(homeStore)
const boardStore = useBoardStore()
const { currentBoard } = toRefs(boardStore)

onMounted(() => homeStore.fetchBoards())
watch(currentBoard, () => homeStore.fetchBoards())
</script>

<template>
  <div
    v-if="boards && boards.length > 0"
    class="mt-6 py-6"
  >
    <div class="text-4xl font-bold text-gray-dark bg-blue py-4 shadow-xl">
      Saved Goals
    </div>

    <div class="flex flex-row flex-wrap gap-4 justify-center pt-6">
      <div
        v-for="board in boards"
        :key="board.id + Math.random()"
        class="w-3/4 h-auto m-4 p-4 text-center bg-gray-dark contrast-125 shadow-lg
              rounded ring-2 ring-gray-dark saturate-150"
      >
        <default-button
          text="Open"
          theme="x"
          class="absolute top-0 left-0 px-4 saturate-50 brightness-75"
          :active="true"
          @click="homeStore.setBoard(board.id)"
        />
        <safety-button
          class="absolute top-0 right-0 saturate-50 brightness-75"
          text="Delete"
          @fired="homeStore.deleteBoard(board.id)"
        />
        <div
          class="line-clamp-1 text-xl text-orange mt-6 mb-2 cursor-pointer select-none hover:saturate-200"
          @click="homeStore.setBoard(board.id)"
        >
          {{ board.name }}
        </div>
        <div class="text-orange/75 text-sm mb-9 select-text">
          {{ board.goal }}
        </div>
        <ProgressBar :value="board.calculateProgress()" />
      </div>
    </div>
  </div>
</template>


