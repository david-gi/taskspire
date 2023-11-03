<script setup lang="ts">
import { ref } from 'vue'
import WarningModal from '../base/WarningModal.vue'

defineProps({
  text: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  }
})
const emit = defineEmits<{
  'upload': [file: File]
}>()

const fileInput = ref<HTMLInputElement>()
const fileInputLabel = ref<HTMLLabelElement>()

function clickLabel() { fileInputLabel.value?.click() }

function uploadFile() {
  const files = fileInput.value?.files
  if ((files?.length ?? 0) < 1) return
  if (!files) return

  const file: File = files[0]
  emit('upload', file)
}

</script>

<template>
  <warning-modal
    :text="text"
    :message="message"
    @continue="clickLabel"
  />
  <label
    ref="fileInputLabel"
    for="fileInput"
    class="hidden"
  >
    {{ text }}
  </label>
  <input
    id="fileInput"
    ref="fileInput"
    type="file"
    accept=".xml"
    class="hidden"
    @change="uploadFile"
  >
</template>

