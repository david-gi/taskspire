<script setup lang='ts'>
import 'src/assets/styles/app.css'
import { computed, } from 'vue'
import TheHomepage from './components/TheHomepage.vue'
import TheBoard from 'src/components/TheBoard.vue'
import AlertBar from 'src/components/base/AlertBar.vue'
import { useBoardStore } from './store/board'
import { alert } from 'src/composables/alert'

const boardStore = useBoardStore()
const onStartPage = computed(() => boardStore.currentBoard === undefined)
const { value, level } = alert('', '')

</script>

<template>
  <alert-bar
    v-model="value"
    :level="level"
  />
  <the-homepage v-if="onStartPage" />
  <the-board v-else />
</template>
