<script setup lang='ts'>
import { watch, toRefs, onMounted } from 'vue'
import { useHomeStore } from '../../store/home'
import { useBoardStore } from '../../store/board'
import GoalRecord from './GoalRecord.vue'

const homeStore = useHomeStore()
const { boards } = toRefs(homeStore)
const boardStore = useBoardStore()
const { currentBoard } = toRefs(boardStore)

onMounted(() => homeStore.loadBoards())
watch(currentBoard, () => homeStore.loadBoards())
</script>

<template>
  <div
    v-if="boards && boards.length > 0"
    class="mt-6 py-6"
  >
    <div class="sm:text-2xl text-lg font-bold text-gray-dark bg-orange/90 contrast-125 py-4 shadow-xl">
      {{ $t('homepage.yourGoals') }}
    </div>

    <div class="flex flex-row flex-wrap gap-6 justify-center pt-6">
      <goal-record
        v-for="board in boards"
        :key="board.id + Math.random()"
        :board="board"
      />
    </div>
  </div>
</template>


