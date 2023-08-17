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

function minimizeToSymbol(text: string) {
  const replaced = text.replace(/[a-zA-Z]/g, '')
  return replaced.length > 0 ? replaced : text
}

function debounce() {
  if (!debounced.value) {
    debounced.value = true
    setTimeout(() => {
      debounced.value = false
    }, 1500)
  }
}
</script>

<template>
  <button
    class="p-2 font-bold rounded-sm active:brightness-75 shadow-gray-dark"
    :class="[colorClass, {
      'bg-gray shadow-none': !isActive,
      'contrast-75 opacity-75': debounced,
      'shadow-xl active:shadow-inner active:contrast-75 hover:brightness-125 hover:saturation-200': isActive
    }]"
    :disabled="!isActive"
    @click="debounce"
  >
    <span class="hidden sm:inline">
      {{ text }}
    </span>
    <span class="sm:hidden">
      {{ minimizeToSymbol(text) }}
    </span>
    <div
      class="float-right pr-6 pt-2 scale-75"
      :class="[{ 'block': debounced, 'hidden': !debounced }]"
    >
      <div class="animate-spin opacity-90 absolute">
        ❍
      </div>
    </div>

  </button>
</template>

