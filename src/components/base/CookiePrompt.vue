<script setup lang="ts">
import { useState } from 'vue-gtag-next'
import { useHomeStore } from '../../store/home'
import DefaultButton from './DefaultButton.vue'
import { onMounted, ref, toRefs } from 'vue'

const homeStore = useHomeStore()
const { cookiesAccepted } = toRefs(homeStore)
const { isEnabled } = useState()
const showPrompt = ref(cookiesAccepted.value !== undefined ? false : true)

onMounted(() => {
  if (cookiesAccepted.value !== undefined) showPrompt.value = false
})

function accept() {
  if (isEnabled) isEnabled.value = true
  homeStore.saveCookieStatus(true)
  showPrompt.value = false
}
function close() {
  showPrompt.value = false
  homeStore.saveCookieStatus(false)
}
</script>

<template>
  <div
    v-if="showPrompt"
    class="fixed right-0 bottom-0 w-fit z-50 bg-purple/90 p-6 rounded"
  >
    <div class="pb-2 text-orangec tracking-tight">
      <div class="font-bold">{{ $t('homepage.cookiePromptHeader') }}</div>
      {{ $t('homepage.cookiePrompt') }}
    </div>
    <default-button
      :text="$t('button.reject')"
      theme="x"
      class="float-left px-6 mr-2"
      :active="true"
      @click="close"
    />
    <default-button
      :text="$t('button.accept')"
      theme="good"
      class="float-right px-6"
      :active="true"
      @click="accept"
    />
  </div>
</template>

