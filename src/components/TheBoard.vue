<script setup lang="ts">
import { computed, provide } from 'vue'
import { storeToRefs } from 'pinia'
import { useBoardStore } from '../store/board'
import { Item } from '../models/board'

import TheHeader from './TheHeader.vue'
import StageContainer from './StageContainer.vue'
import ItemForm from './ItemForm.vue'

const boardStore = useBoardStore()
const { currentBoard, selectedItem, selectedItemIndex, selectedStageIndex, draggedItemId } = storeToRefs(boardStore)
provide('draggedItemId', draggedItemId)

boardStore.$subscribe(boardStore.save)

const firstStage = computed(() => selectedStageIndex.value == 0)
const lastStage = computed(() => selectedStageIndex.value == (currentBoard.value?.stages.length ?? 1) - 1)

//#region Item Actions

function clearItemSelection() { boardStore.setSelectedItem() }

function addNewItem(stageIndex: number): void {
  clearItemSelection()
  setTimeout(() => {
    boardStore.$patch((state) => {
      const newItem = new Item()
      state.currentBoard?.stages[stageIndex].items.push(newItem)
      boardStore.setSelectedItem(newItem.id)
    })
  }, 1)
}

function moveItem(toStageIndex: number, toItemIndex: number | null, itemId: string) {
  boardStore.setSelectedItem(itemId)
  boardStore.$patch((state) => {
    if (state.selectedItem) {
      if (toItemIndex == null) {
        state.currentBoard?.stages[toStageIndex]
          .items.push(state.selectedItem)
        deleteSelectedItem()
        boardStore.setSelectedItem(itemId)
      } else {
        const movedItem = state.selectedItem
        deleteSelectedItem()
        state.currentBoard?.stages[toStageIndex]
          .items.splice(toItemIndex, 0, movedItem)
        boardStore.setSelectedItem(itemId)
      }
    }
  })
  clearItemSelection()
}

function deleteSelectedItem() {
  boardStore.$patch((state) => {
    state.currentBoard?.stages[state.selectedStageIndex]
      .items.splice(state.selectedItemIndex, 1)
  })
  clearItemSelection()
}

//#endregion
</script>

<template>
  <div class="flex h-screen flex-row gap-6 p-6 pt-12 subpixel-antialiased overflow-visible">
    <the-header :big="false" />
    <stage-container
      v-for="(stage, i) in  currentBoard?.stages "
      :key="'stage-' + i"
      :value="stage"
      :index="i"
      :class="{ 'h-1/2': selectedItem }"
      @add-item="addNewItem(i)"
      @open-item="boardStore.setSelectedItem"
      @move-item="moveItem"
    />

    <item-form
      v-if="selectedItem"
      v-model="selectedItem"
      :index="selectedItemIndex"
      :first="firstStage"
      :last="lastStage"
      @reorder="(newIndex: number) => { moveItem(selectedStageIndex, newIndex, selectedItem?.id ?? '') }"
      @regress="moveItem(selectedStageIndex - 1, null, selectedItem.id)"
      @progress="moveItem(selectedStageIndex + 1, null, selectedItem.id)"
      @delete="deleteSelectedItem"
      @closed="clearItemSelection"
    />
  </div>
</template>
