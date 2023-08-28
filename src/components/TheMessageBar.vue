<script setup lang="ts">
import { toRefs } from 'vue'
import { useMessageStore } from '../store/message'

const messageStore = useMessageStore()
const { message, level } = toRefs(messageStore)

</script>

<template>
  <div
    v-if="message"
    class="bg-gray-dark border-b-4 text-2xl text-center font-bold w-full p-3 fixed top-0 z-50 opacity-90"
    :class="['border-' + level.color, 'text-' + level.color]"
    @click="messageStore.clear()"
  >
    {{ message }}
  </div>
</template>

