<script setup lang='ts'>
import 'src/assets/styles/app.css'
import { computed, onBeforeMount, watch } from 'vue'
import { useHomeStore } from './store/home'
import { useBoardStore } from './store/board'
import { useGtag, ScreenView } from 'vue-gtag-next'
import { useI18n } from 'vue-i18n'
import TheHomepage from './components/TheHomepage.vue'
import TheBoard from './components/TheBoard.vue'
import MessageBar from './components/TheMessageBar.vue'
import CookiePrompt from './components/common/CookiePrompt.vue'
import LocalStorageCheck from './components/common/LocalStorageCheck.vue'
import AdminPage from './components/admin/AdminPage.vue'

const gtag = useGtag()
const { t } = useI18n()
const homeStore = useHomeStore()
const boardStore = useBoardStore()
const showAdmin = computed(() => window.location.hash == '#admin')
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
  <div v-if="!showAdmin">
    <the-homepage v-if="showHomepage" />
    <the-board v-else />
    <local-storage-check />
    <cookie-prompt />
  </div>
  <div v-else>
    <admin-page />
  </div>
  <message-bar />
</template>
