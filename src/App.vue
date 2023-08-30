<script setup lang='ts'>
import 'src/assets/styles/app.css'
import { computed, onBeforeMount, watch } from 'vue'
import TheHomepage from './components/TheHomepage.vue'
import TheBoard from 'src/components/TheBoard.vue'
import MessageBar from 'src/components/TheMessageBar.vue'
import { useBoardStore } from './store/board'
import { useGtag, ScreenView } from 'vue-gtag-next'
import { useI18n } from 'vue-i18n'
import CookiePrompt from './components/base/CookiePrompt.vue'

const gtag = useGtag()
const { t } = useI18n()
const boardStore = useBoardStore()
const showHomepage = computed(() => boardStore.currentBoard === undefined)

onBeforeMount(() => {
  document.title = t('website.name') + ' | ' + t('website.slogan')
  document.querySelector('meta[name="description"]')?.setAttribute('content', t('website.description'))
  document.querySelector('meta[name="keywords"]')?.setAttribute('content', t('website.keywords'))
})
watch(showHomepage, async (val) => {
  gtag.screenview({ screen_name: val ? 'home' : 'board' } as ScreenView)
})
</script>

<template>
  <the-homepage v-if="showHomepage" />
  <the-board v-else />
  <cookie-prompt />
  <message-bar />
</template>
