<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ tip: string }>()

const visible = ref(false)

function toggle() {
  visible.value = !visible.value
}
function show() {
  visible.value = true
}
function hide() {
  visible.value = false
}
</script>

<template>
  <span
    class="cursor-pointer"
    @click="toggle"
    @mouseenter="show"
    @mouseleave="hide"
  >
    <slot />
    <div
      v-if="visible"
      class="absolute z-50 h-fit w-1/2 bottom-0 left-1/4 p-4 text-left
      text-base md:text-lg text-green bg-gray-dark brightness-75 rounded 
      whitespace-pre-line"
    >
      {{ tip }}
    </div>
  </span>
</template>

