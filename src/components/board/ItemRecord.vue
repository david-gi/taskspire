<script setup lang='ts'>
import { inject, Ref } from 'vue'
import { Item } from '../../models/classes'

const draggedItemId = inject<Ref<string>>('draggedItemId')
const props = defineProps<{ value: Item }>()

function handleDragStart() {
  if (draggedItemId) draggedItemId.value = props.value.id
}
</script>

<template>
  <div
    class="bg-purple rounded m-2 p-2 border-x-4 hover:brightness-105 ring-1 ring-purple
           snap-always snap-start scroll-my-4 touch-manipulation active:opacity-25"
    :style="{
      'border-color': ('rgb(var(--color-' + props.value.color + '))'),
    }"
    draggable="true"
    @dragstart="handleDragStart"
    @touchstart.passive="handleDragStart"
  >
    <div
      class="sm:text-base text-sm cursor-pointer line-clamp-4 font-bold overflow-clip"
      :title="value.name"
    >
      {{ value.name }}
    </div>
  </div>
</template>


