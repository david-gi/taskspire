<script setup lang="ts">
import { watch } from 'vue'
const props = defineProps({
  value: {
    type: Number,
    required: true,
  },
  big: {
    type: Boolean,
    default: true,
  },
})

watch(() => props.value, () => { })
</script>

<template>
  <div
    class="w-full absolute bottom-0 bg-green/25"
    :class="[{ 'h-5 rounded-b -mx-4 ': big, 'h-3 opacity-75': !big }]"
  >
    <div
      class="bg-green/50"
      :class="[{ 'h-5': big, 'h-3': !big }]"
      :style="{ 'width': (value + '%') }"
    >
    </div>
    <span
      v-if="big"
      class="text-sm absolute -mt-5 font-bold drop-shadow select-none"
    >
      {{ value + '%' }}
    </span>
  </div>
</template>

