<script setup lang='ts'>
import { ref } from 'vue'

defineProps<{ modelValue: string }>()
const emit = defineEmits<{
  'update:modelValue': [val: string]
}>()

const activated = ref<boolean>(false)
const colors = [
  'blue',
  'green',
  'orange',
  'pink',
]
const baseClasses = [
  'w-fit',
  'cursor-pointer',
  'rounded',
  'shadow-inner',
  'saturate-150',
  'hover:shadow-none',
  'hover:brightness-105',
  'active:brightness-75',
]
const timer = ref<NodeJS.Timeout>()

function toggle() {
  activated.value = !activated.value
  if (activated.value) timer.value = setTimeout(() => activated.value = false, 3000)
}

function select(color: string) {
  emit('update:modelValue', color)
  activated.value = false
  clearTimeout(timer.value)
}

</script>

<template>
  <div>
    <div
      class="float-left border-2 p-2 mr-1 border-gray-dark font-bold select-none"
      :class="[baseClasses, { 'brightness-75 hover:brightness-75': activated }]"
      :style="{
        'border-color': ('rgb(var(--color-' + modelValue + '))'),
        'color': ('rgb(var(--color-' + modelValue + '))')
      }"
      @click="toggle"
    >
      Highlight
    </div>

    <div
      v-if="activated"
      class="w-fit float-left border-t-2 border-gray-dark"
    >
      <div
        v-for="color in colors"
        :key="'color-' + color"
        :class="baseClasses"
        :style="{ 'background-color': ('rgb(var(--color-' + color + '))') }"
        class="p-5 mx-1 float-left ring-1 ring-gray-dark"
        @click="select(color)"
      ></div>
      <br class="clear-both" />
    </div>
  </div>
</template>


