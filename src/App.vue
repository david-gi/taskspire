<script setup lang='ts'>
import 'src/assets/styles/app.css'
import { computed, onBeforeMount, } from 'vue'
import TheHomepage from './components/TheHomepage.vue'
import TheBoard from 'src/components/TheBoard.vue'
import MessageBar from 'src/components/TheMessageBar.vue'
import { useBoardStore } from './store/board'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const boardStore = useBoardStore()
const onStartPage = computed(() => boardStore.currentBoard === undefined)
onBeforeMount(() => {
  document.title = t('website.name') + ' | ' + t('website.slogan')
  document.querySelector('meta[name="description"]')?.setAttribute('content', t('website.description'))
  document.querySelector('meta[name="keywords"]')?.setAttribute('content', t('website.keywords'))
})
</script>

<template>
  <message-bar />
  <the-homepage v-if="onStartPage" />
  <the-board v-else />
</template>
