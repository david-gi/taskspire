<script setup lang="ts">
import { useState } from 'vue-gtag-next'
import DefaultButton from './DefaultButton.vue'
import { ref } from 'vue'

const { isEnabled } = useState()
const showPrompt = ref(true)

function accept() {
  if (isEnabled) isEnabled.value = true
  close()
}
function close() {
  showPrompt.value = false
}
</script>

<template>
  <div
    v-if="showPrompt"
    class="fixed right-0 bottom-0 w-fit z-100 bg-gray-dark/90 
          p-3 border-2 border-blue/90 rounded"
  >
    <div class="pb-2 text-right text-blue tracking-tight">
      <span class="font-bold">Cookies:</span>
      {{ $t('homepage.cookiePrompt') }}
    </div>
    <default-button
      :text="$t('button.reject')"
      theme="x"
      class="float-left px-6 mr-2"
      :active="true"
    />
    <default-button
      :text="$t('button.accept')"
      theme="neutral"
      class="float-right px-6 bg-blue"
      :active="true"
      @click="accept"
    />
  </div>
</template>

