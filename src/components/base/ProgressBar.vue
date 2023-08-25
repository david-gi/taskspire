<script setup lang="ts">
import { watch } from 'vue'
const props = defineProps({
  value: {
    type: Number,
    required: true,
  },
  text: {
    type: String,
    default: '',
  }
})

watch(() => props.value, () => { })
</script>

<template>
  <div
    class="w-full h-6 absolute bottom-0 bg-green/25 text-center"
    :class="[{ 'rounded-b': !text, 'opacity-75': text }]"
  >
    <div
      class="bg-green/50 h-6"
      :style="{ 'width': (value + '%') }"
    >
    </div>
    <div class="text-center w-full">
      <span class="-mt-5 sm:px-12 px-2 line-clamp-1 overflow-elipsis text-sm font-bold drop-shadow select-none">
        {{ text ? text : (value + '%') }}
      </span>
    </div>
  </div>
</template>

