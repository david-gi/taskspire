<script setup lang='ts'>
import { computed, ref } from 'vue'

const props = defineProps<{ text: string, theme: string, active: boolean }>()
const debounced = ref<boolean>(false)
const isActive = computed(() => props.active && !debounced.value)

const colorClass = ref<string>('')
switch (props.theme) {
  case 'good':
    colorClass.value = 'bg-green/75 saturate-150'
    break
  case 'neutral':
    colorClass.value = 'bg-purple'
    break
  case 'mean':
    colorClass.value = 'bg-yellow text-pink ring-2 ring-pink saturate-200'
    break
  case 'evil':
    colorClass.value = 'bg-pink brightness-90 saturate-200'
    break
  default:
    colorClass.value = 'bg-gray-light/25'
    break
}

function debounce() {
  if (debounced.value) {
    debounced.value = false
    setTimeout(() => {
      debounced.value = true
    }, 1500)
  }
}
</script>

<template>
  <button
    class="p-2 font-bold rounded-sm hover:shadow-none active:brightness-75 drop-shadow"
    :class="[colorClass, {
      'bg-gray': !isActive,
      'hover:brightness-125 hover:saturation-200 shadow-lg': isActive
    }]"
    :disabled="!isActive"
    @click="debounce"
  >
    {{ text }}
  </button>
</template>

