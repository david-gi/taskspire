<script setup lang='ts'>
import { useMainStore } from 'src/store/main'
import { toRefs } from 'vue'
import ProgressBar from './base/ProgressBar.vue'

const mainStore = useMainStore()
const { boards } = toRefs(mainStore)
</script>

<template>
  <div
    v-if="boards"
    class="mt-6 py-6"
  >
    <div class="text-4xl font-bold text-gray-dark bg-blue py-4 shadow-xl">
      Saved Goals
    </div>

    <div class="flex flex-row flex-wrap justify-center pt-4">
      <div
        v-for="board in boards"
        :key="board.id"
        class="w-1/3 h-48 m-4 p-4 text-center bg-gray-dark contrast-125 shadow-lg
              rounded ring-2 ring-blue hover:brightness-125 hover:saturate-150 hover:cursor-pointer"
        @click="mainStore.setBoard(board.id)"
      >
        <span class=" text-2xl text-blue ">
          {{ board.id }}
        </span>

        <ProgressBar :value="board.calculateProgress()" />
      </div>
    </div>
  </div>
</template>


