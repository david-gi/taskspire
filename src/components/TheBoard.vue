<script setup lang="ts">
import { computed, provide, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useGtag, } from 'vue-gtag-next'
import { useI18n } from 'vue-i18n'
import { useBoardStore } from '../store/board'
import { useMessageStore } from '../store/message'
import { Item } from '../models/classes'

import TheHeader from './TheHeader.vue'
import StageContainer from './board/StageContainer.vue'
import ItemForm from './board/ItemForm.vue'
import PomodoroOverlay from './pomodoro/PomodoroOverlay.vue'
import ProgressBar from './common/ProgressBar.vue'

const gtag = useGtag()
const { t } = useI18n()
const boardStore = useBoardStore()
const { currentBoard, selectedItem, selectedItemIndex, selectedStageIndex, draggedItemId } = storeToRefs(boardStore)
const messageStore = useMessageStore()

provide('draggedItemId', draggedItemId)

boardStore.$subscribe(boardStore.saveCurrent)
watch(currentBoard, () => {
  if (currentBoard.value?.calculateProgress() == 100) {
    messageStore.show(t('message.goalCompleted'), 'success')
    gtag.event('goal_completed')
  }
})

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
      if (toItemIndex == null && state.currentBoard) {
        state.currentBoard.stages[toStageIndex]
          .items = state.currentBoard.stages[toStageIndex]
            .items.concat(state.selectedItem as Item)
        deleteSelectedItem()
        boardStore.setSelectedItem(itemId)
      } else {
        const movedItem = state.selectedItem as Item
        deleteSelectedItem()
        state.currentBoard?.stages[toStageIndex]
          .items.splice(toItemIndex ?? 0, 0, movedItem)
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
  <the-header :big="false" />
  <pomodoro-overlay />
  <div
    id="stages-container"
    class="flex w-screen h-screen flex-row gap-1 sm:gap-2 md:gap-6 lg:gap-9
          pt-4 px-0 sm:px-2 md:px-6 lg:px-9 
          subpixel-antialiased overflow-visible"
  >
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
  <progress-bar
    v-if="currentBoard"
    :value="currentBoard.calculateProgress()"
    :text="currentBoard?.name"
    class="ml-0"
  />
</template>
