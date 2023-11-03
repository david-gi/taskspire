<script setup lang="ts">
import { computed, watch, ref, toRefs } from 'vue'
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  }
})
const emits = defineEmits<{ 'update:modelValue': [value: string] }>()

const timer = ref<NodeJS.Timeout>()
const shown = ref(false)
const { modelValue, level } = toRefs(props)
const levelDetails = [
  {
    key: 'info',
    color: 'blue',
    delay: 2000,
  },
  {
    key: 'success',
    color: 'green',
    delay: 2000,
  },
  {
    key: 'warning',
    color: 'yellow',
    delay: 3000,
  },
  {
    key: 'error',
    color: 'pink',
    delay: 10000,
  }
]

const details = computed(() => levelDetails.find((d) => d.key === level.value) ?? levelDetails[0])
const timeoutAlert = () => {
  if (modelValue.value && shown.value === false) {
    shown.value = true
    timer.value = setTimeout(() => clear(), details.value.delay)
  }
}
const clear = () => {
  shown.value = false
  emits('update:modelValue', '')
  clearTimeout(timer.value)
}

watch(modelValue, timeoutAlert)
</script>

<template>
  <div
    v-if="shown"
    class="bg-gray-dark border-b-4 text-2xl text-center font-bold w-full p-3 fixed top-0 z-50 opacity-90"
    :class="['border-' + details.color, 'text-' + details.color]"
    @click="clear"
  >
    {{ modelValue }}
  </div>
</template>

