<script setup lang='ts'>
import { useMainStore } from 'src/store/main'
import { toRefs } from 'vue'
import DefaultButton from './base/DefaultButton.vue'
import DeleteButton from './base/DeleteButton.vue'
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

    <div class="flex flex-row flex-wrap gap-4 justify-center pt-6">
      <div
        v-for="board in boards"
        :key="board.id + Math.random()"
        class="w-3/4 h-auto m-4 p-4 text-center bg-gray-dark contrast-125 shadow-lg
              rounded ring-2 ring-blue hover:brightness-125 hover:saturate-150"
      >
        <default-button
          text="Open"
          theme="x"
          class="absolute top-0 left-0 px-6"
          :active="true"
          @click="mainStore.setBoard(board.id)"
        />
        <delete-button
          class="absolute top-0 right-0 saturate-50 brightness-75"
          @delete="$emit('delete')"
        />
        <div
          class="line-clamp-1 text-xl text-orange mt-6 mb-2 cursor-pointer select-none hover:saturate-200"
          @click="mainStore.setBoard(board.id)"
        >
          {{ board.name }}
        </div>
        <div class="text-blue text-sm mb-9 select-text">
          {{ board.goal }}
        </div>
        <ProgressBar :value="board.calculateProgress()" />
      </div>
    </div>
  </div>
</template>


