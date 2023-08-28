<script setup lang='ts'>
import 'src/assets/styles/app.css'
import { computed, } from 'vue'
import TheHomepage from './components/TheHomepage.vue'
import TheBoard from 'src/components/TheBoard.vue'
import MessageBar from 'src/components/TheMessageBar.vue'
import { useBoardStore } from './store/board'

const boardStore = useBoardStore()
const onStartPage = computed(() => boardStore.currentBoard === undefined)
</script>

<template>
  <message-bar />
  <the-homepage v-if="onStartPage" />
  <the-board v-else />
</template>
