<script setup lang="ts">
import { ref } from 'vue'
import DefaultButton from './DefaultButton.vue'
import SafetyButton from './SafetyButton.vue'

defineProps({
  text: {
    type: String,
    required: false,
  },
  message: {
    type: String,
    required: true,
  }
})
const emit = defineEmits<{
  'continue': []
}>()

const shown = ref(false)

function handleContinue() {
  shown.value = false
  emit('continue')
}
</script>

<template>
  <default-button
    v-if="text"
    :text="text"
    theme="x"
    :active="!shown"
    @click="shown = true"
  />
  <div
    v-if="shown"
    class="absolute top-0 left-0 backdrop-brightness-50 w-screen h-screen z-40"
    @keypress="shown = false"
  >
    <div
      style=""
      class="absolute top-1/3 left-4 right-4 md:left-1/4 md:right-1/4 lg:left-1/3 lg:right-1/3 w-auto
                bg-purple rounded ring ring-gray-dark z-50"
    >
      <div class="bg-gray-dark/25 text-lg font-bold p-4 px-6 md:px-12">
        <div class="text-2xl py-1">⚠</div>
        {{ message }}
      </div>
      <div class="bg-gray-dark/50 h-10">
        <safety-button
          :text="$t('button.continue')"
          class="w-fit float-right"
          @fired="handleContinue"
        />
        <a
          class="float-left p-2 px-4 hover:font-bold cursor-pointer"
          @click="shown = false"
        >{{ $t('button.cancel').toLowerCase() }}</a>
      </div>
    </div>
  </div>
</template>

