<script setup lang='ts'>
import { inject, Ref } from 'vue'
import { Item } from '../models/board'

const draggedItemId = inject<Ref<string>>('draggedItemId')
const props = defineProps<{ value: Item }>()

function handleDragStart() {
  if (draggedItemId) draggedItemId.value = props.value.id
}

</script>

<template>
  <div
    class="bg-purple rounded m-2 border-x-4 hover:brightness-105 ring-1 ring-purple
      snap-always snap-start scroll-my-4 truncate touch-manipulation active:opacity-25"
    :style="{
      'border-color': ('rgb(var(--color-' + props.value.color + '))'),
    }"
    draggable="true"
    @dragstart="handleDragStart"
    @touchstart.passive="handleDragStart"
  >
    <div
      class="p-2 cursor-pointer"
      :title="value.name"
    >
      <h1 class="font-bold text-ellipsis overflow-hidden">
        {{ value.name }}
      </h1>
      <p class="whitespace-pre-line line-clamp-2">
        {{ value.desc }}
      </p>
    </div>
  </div>
</template>


