<script setup lang='ts'>
import { ref } from 'vue'
import DefaultButton from './DefaultButton.vue'

defineProps({ text: { type: String, required: true } })
defineEmits<{
  fired: []
}>()

const toggled = ref(false)

function toggle() {
  setTimeout(() => {
    toggled.value = true
    setTimeout(() => toggled.value = false, 3000)
  },
    900)
}
</script>

<template>
  <div class="bg-gray">
    <default-button
      :text="text"
      theme="evil"
      class="w-20 ring-pink bg-opacity-60 transition duration-300 ease-in-out transform
            disabled:saturate-75 disabled:-translate-x-16"
      :class="{ 'hidden': toggled }"
      :active="true"
      @click="toggle"
    />
    <default-button
      :text="text"
      theme="mean"
      class="w-20 animate-pulse -translate-x-16"
      :class="{ 'hidden': !toggled }"
      :active="true"
      @click="$emit('fired')"
    />
  </div>
</template>

