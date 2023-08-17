<script setup lang='ts'>
import { inject, Ref } from 'vue'
import { Stage } from 'src/models/board'

import ItemContainer from './ItemContainer.vue'
import AddButton from './base/AddButton.vue'

const draggedItemId = inject<Ref<string>>('draggedItemId')
const props = defineProps<{ value: Stage, index: number }>()
const emit = defineEmits<{
  'add-item': [],
  'open-item': [id: string],
  'move-item': [stageIndex: number, itemIndex: number, id: string]
}>()

function handleDrop(e: Event, itemIndex: number) {
  if (draggedItemId && draggedItemId.value.length > 0)
    emit('move-item', props.index, itemIndex, draggedItemId.value)
}

</script>

<template>
  <div
    class="bg-purple/75 w-1/3 min-w-min max-w-xs p-4 pt-0 rounded shadow-lg
          overflow-y-scroll snap-y snap-mandatory scroll-py-10 no-scrollbar"
    @dragover.prevent
    @dragenter.prevent
  >
    <h2
      :id="'Stage-' + props.index"
      class="bg-purple brightness-90 shadow-md text-center sticky top-0 py-3 mb-4 -mx-4 z-20 leading-3"
    >
      <strong class="text-green brightness-110 uppercase">
        {{ props.value.name }}
      </strong>
    </h2>
    <div class="grid grid-flow-row gap-1 auto-rows-max">
      <item-container
        v-for="item, i in value.items"
        :key="'item-' + item.id"
        :value="item"
        @click="$emit('open-item', item.id)"
        @drop="(e: DragEvent) => handleDrop(e, i)"
      />
      <add-button @click="$emit('add-item')" />
    </div>
  </div>
</template>

