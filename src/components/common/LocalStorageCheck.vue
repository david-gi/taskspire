<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useHomeStore } from '../../store/home'

const homeStore = useHomeStore()

const showError = ref(false)

onMounted(() => {
  if (!homeStore.localStorageCheck()) showError.value = true
})
</script>

<template>
  <div
    v-if="showError"
    class="absolute w-screen h-screen top-0 bg-gray-dark/25"
  >
    <div class="absolute bottom-0 font-bold w-full text-center bg-pink px-6 py-12">
      {{ $t('message.noLocalStorage') }}
    </div>
  </div>
</template>

