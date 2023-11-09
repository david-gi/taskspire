<script setup lang="ts">
import { onMounted, ref } from 'vue'
import DefaultButton from '../base/DefaultButton.vue'

defineProps({ locked: { type: Boolean, default: false } })

defineEmits<{
  'submit': [val: string],
  'closed': []
}>()

const input = ref<HTMLInputElement>()
const passcode = ref()

onMounted(() => { input.value?.focus() })
</script>

<template>
  <div
    class="absolute bg-gray-dark dark top-0 bottom-0 right-0 left-0"
    :class="{ 'opacity-50': !locked }"
  ></div>
  <div class="p-12 top-1/4 md:left-1/4 lg:left-1/3 w-full md:w-1/2 lg:w-1/3 
              fixed bg-pink/75 brightness-75 rounded">
    <form>
      <input
        ref="input"
        v-model="passcode"
        placeholder=" Enter Passcode "
        type="password"
        class="w-full bg-gray/75 p-2 outline-none"
        autocomplete="password"
        maxlength="240"
        @keypress.Enter="$emit('submit', passcode)"
      />
    </form>
    <default-button
      text="Authorize"
      theme="good"
      class="w-full py-2 px-4"
      @click="$emit('submit', passcode)"
    />
    <default-button
      v-if="!locked"
      text="cancel"
      theme="x"
      class="px-2 font-bold absolute top-0 right-0"
      @click="$emit('closed')"
    />
  </div>
</template>
    
