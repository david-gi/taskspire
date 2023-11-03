<script setup lang='ts'>
import { ref } from 'vue'
import DefaultButton from './DefaultButton.vue'

defineProps({ text: { type: String, default: 'Delete' } })
defineEmits<{
  delete: []
}>()

const deleteActivated = ref<boolean>()

function startDelete() {
  setTimeout(() => {
    deleteActivated.value = true
    setTimeout(() => deleteActivated.value = false, 3000)
  },
    900)
}
</script>

<template>
  <div class="bg-gray">
    <default-button
      :text="text"
      theme="evil"
      class="w-16 ring-pink bg-opacity-60 transition duration-300 ease-in-out transform disabled:-translate-x-16"
      :class="{ 'hidden': deleteActivated }"
      :active="true"
      @click="startDelete"
    />
    <default-button
      :text="text"
      theme="mean"
      class="w-16 animate-pulse -translate-x-16"
      :class="{ 'hidden': !deleteActivated }"
      :active="true"
      @click="$emit('delete')"
    />
  </div>
</template>

