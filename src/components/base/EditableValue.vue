<script setup lang='ts'>
import { nextTick, ref } from 'vue'

const props = defineProps<{ label: string }>()

const activated = ref<boolean>(false)
const timer = ref<NodeJS.Timeout>()


function clear() {
  clearTimeout(timer.value)
}

function toggle(val: boolean | null = null) {
  activated.value = val ?? !activated.value
  if (activated.value) timeout()
  else clear()
  nextTick(() => (document.getElementById('editSlot' + props.label)?.firstElementChild as HTMLElement)?.focus())
}

function timeout() {
  timer.value = setTimeout(() => { activated.value = false; clear() }, 15000)
}

function extend() {
  clear()
  timeout()
}
</script>

<template>
  <label class="font-bold select-none">{{ label }} </label>
  <div
    @dblclick="() => toggle(true)"
    @click="() => activated ? extend() : toggle(true)"
    @focusout="() => toggle(false)"
    @blur="clear"
    @keydown="extend"
  >
    <div
      v-if="!activated"
      class="cursor-text transition ease-in rounded hover:bg-purple/25 selection:bg-none mr-2"
    >
      <span class="float-right right-9 -mt-5 font-thin opacity-60 text-sm align-super select-none">
        [{{ $t('input.labelEdit') }}]
      </span>
      <div class="whitespace-pre-wrap break-words">
        <slot name="display">
        </slot>
      </div>
    </div>
    <div
      :id="'editSlot' + label"
      class="selection:bg-purple/50 pr-4"
    >
      <slot
        v-if="activated"
        name="edit"
      ></slot>
    </div>
  </div>
</template>


