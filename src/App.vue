<script setup lang='ts'>
import 'src/assets/styles/app.css'
import { computed, } from 'vue'
import TheHomepage from './components/TheHomepage.vue'
import TheBoard from 'src/components/TheBoard.vue'
import MsgBar from 'src/components/base/MsgBar.vue'
import { useBoardStore } from './store/board'
import { msg } from 'src/composables/msg'

const boardStore = useBoardStore()
const onStartPage = computed(() => boardStore.currentBoard === undefined)
const { value, level } = msg('', '')

</script>

<template>
  <msg-bar
    v-model="value"
    :level="level"
  />
  <the-homepage v-if="onStartPage" />
  <the-board v-else />
</template>
