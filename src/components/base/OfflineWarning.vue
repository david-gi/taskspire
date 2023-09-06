<script setup lang="ts">
import { onMounted } from 'vue'
import { useMessageStore } from '../../store/message'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const messageStore = useMessageStore()

onMounted(() => {
  window.addEventListener('offline', () => {
    messageStore.show(t('message.offline'), 'warning')
  })
})
</script>

<template>
  <span></span>
</template>

