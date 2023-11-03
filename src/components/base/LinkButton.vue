<script setup lang="ts">
import DefaultButton from './DefaultButton.vue'

defineProps({
  text: {
    type: String,
    required: true,
  },
  href: {
    type: String,
    default: '',
  },
  download: {
    type: String,
    default: '',
  }
})
</script>

<template>
  <a
    :href="href"
    target="_blank"
    :download="download"
  >
    <default-button
      :text="text"
      theme="x"
      class="py-2"
      :active="true"
    />
  </a>
</template>

