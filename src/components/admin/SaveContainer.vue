<script setup lang="ts">
import { ref } from 'vue'
import DefaultButton from '../base/DefaultButton.vue'
import AuthPrompt from './AuthPrompt.vue'

defineProps({ unsavedChanges: Boolean })

defineEmits<{
  'saveChanges': [passcode: string],
  'undoChanges': []
}>()

const showAuthPrompt = ref(false)

const initiateSaving = () => showAuthPrompt.value = true
</script>

<template>
  <div class="h-full w-full">
    <div class="p-4">
      <slot>

      </slot>
    </div>
    <default-button
      text="Reset"
      theme="x"
      class="fixed bottom-0 left-0 px-4"
      :class="{ 'opacity-50': !unsavedChanges }"
      :active="unsavedChanges"
      @click="$emit('undoChanges')"
    />
    <default-button
      text="Save Changes"
      theme="good"
      class="fixed bottom-0 right-0 px-4"
      :class="{ 'opacity-50': !unsavedChanges }"
      :active="unsavedChanges"
      @click="initiateSaving"
    />
    <auth-prompt
      v-if="showAuthPrompt"
      @submit="x => { $emit('saveChanges', x); showAuthPrompt = false }"
      @closed="showAuthPrompt = false"
    />
  </div>
</template>
    
