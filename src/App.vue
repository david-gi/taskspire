<script setup lang='ts'>
import 'src/assets/styles/app.css'
import { computed, onBeforeMount, watch } from 'vue'
import TheHomepage from './components/TheHomepage.vue'
import TheBoard from 'src/components/TheBoard.vue'
import MessageBar from 'src/components/TheMessageBar.vue'
import { useHomeStore } from './store/home'
import { useBoardStore } from './store/board'
import { useGtag, ScreenView } from 'vue-gtag-next'
import { useI18n } from 'vue-i18n'
import CookiePrompt from './components/base/CookiePrompt.vue'
import LocalStorageCheck from './components/base/LocalStorageCheck.vue'

const gtag = useGtag()
const { t } = useI18n()
const homeStore = useHomeStore()
const boardStore = useBoardStore()
const showHomepage = computed(() => boardStore.currentBoard === undefined)

onBeforeMount(() => {
  setHead()
  homeStore.loadCookieStatus()
})
watch(showHomepage, async (val) => {
  gtag.screenview({ screen_name: val ? 'home' : 'board' } as ScreenView)
})

function setHead() {
  document.title = t('website.name') + ' | ' + t('website.slogan')
  document.querySelector('meta[name="description"]')?.setAttribute('content', t('website.description'))
  document.querySelector('meta[name="keywords"]')?.setAttribute('content', t('website.keywords'))
}
</script>

<template>
  <the-homepage v-if="showHomepage" />
  <the-board v-else />
  <cookie-prompt />
  <local-storage-check />
  <message-bar />
</template>
