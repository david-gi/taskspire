<script setup lang='ts'>
import { inject, Ref } from 'vue'
import { Stage } from '../../models/classes'

import ItemRecord from './ItemRecord.vue'
import AddButton from '../base/AddButton.vue'

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
    class="bg-purple/75 w-1/3 min-w-min max-w-md mt-6 p-4 pt-0 rounded shadow-lg
          overflow-y-scroll snap-y snap-mandatory scroll-py-10 no-scrollbar tracking-tight"
    @dragover.prevent
    @dragenter.prevent
  >
    <h2
      :id="'Stage-' + props.index"
      class="bg-purple brightness-90 shadow-md text-sm sm:text-base text-center sticky top-0 py-3 mb-4 -mx-4 z-20 leading-3"
    >
      <span class="text-green/75 font-extrabold brightness-110 uppercase whitespace-nowrap select-none">
        {{ props.value.name }}
      </span>
    </h2>
    <div class="grid grid-flow-row gap-1 auto-rows-max touch-pan-y">
      <item-record
        v-for="item, i in value.items"
        :key="'item-' + item.id"
        :value="item"
        @click="$emit('open-item', item.id)"
        @drop="(e: DragEvent) => handleDrop(e, i)"
        @dragenter.prevent
        @dragover.prevent
      />
      <add-button
        v-if="index == 0"
        class="mb-6"
        @click="$emit('add-item')"
        @drop="(e: DragEvent) => handleDrop(e, 0)"
        @dragenter.prevent
        @dragover.prevent
      />
      <div
        v-else
        class="w-full h-36"
        @drop="(e: DragEvent) => handleDrop(e, 0)"
        @dragenter.prevent
        @dragover.prevent
      ></div>
    </div>
  </div>
</template>

