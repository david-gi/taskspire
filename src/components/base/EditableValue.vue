<script setup lang='ts'>
import { nextTick, ref } from 'vue'

const props = defineProps<{ label: string }>()

const activated = ref<boolean>(false)
const timer = ref<NodeJS.Timeout>()


function toggle(val: boolean | null = null) {
  activated.value = val ?? !activated.value
  timeout()
  if (!activated.value) { clearTimeout(timer.value) }
  nextTick(() => (document.getElementById('editSlot' + props.label)?.firstElementChild as HTMLElement)?.focus())
}

function timeout() {
  timer.value = setTimeout(() => activated.value = false, 10000)
}

function extend() {
  clearTimeout(timer.value)
  timeout()
}
</script>

<template>
  <label class="font-bold select-none">{{ label }} </label>
  <div
    @dblclick="toggle(true)"
    @click="toggle(true)"
    @focusout="toggle(false)"
    @keydown="extend"
  >
    <div
      v-if="!activated"
      class="cursor-text transition ease-in rounded hover:bg-purple/25 selection:bg-none mr-2"
    >
      <span class="absolute right-9 -mt-5 font-thin opacity-60 text-sm align-super select-none">
        [{{ $t('input.labelEdit') }}]
      </span>
      <slot name="display"></slot>
    </div>
    <div
      :id="'editSlot' + label"
      class="selection:bg-purple/50"
    >
      <slot
        v-if="activated"
        name="edit"
      ></slot>
    </div>
  </div>
</template>


