<script setup lang="ts">
import { useHomeStore } from '../store/home'
import { useBoardStore } from '../store/board'
import DefaultButton from './base/DefaultButton.vue'

defineProps<{ big: boolean }>()
const homeStore = useHomeStore()
const boardStore = useBoardStore()

function goToHome() {
  boardStore.setSelectedItem()
  homeStore.setBoard()
}

</script>

<template>
  <h1
    v-if="big"
    class="bg-purple/40 brightness-125 text-center scale-110 py-3"
  >
    <span
      id="header-name"
      class="text-green text-4xl font-black"
    >
      Taskspire
    </span>
    <br />
    <span class="sm:text-2xl text-lg font-semibold whitespace-nowrap opacity-90">
      Reach Goals! One task at a time...
    </span>
  </h1>
  <h1
    v-if="!big"
    class="absolute w-full text-green -mt-3 -mb-10x pl-5 line-clamp-1"
  >
    <span
      id="
    header-name"
      class="text-lg md:text-2xl font-bold"
    >
      Taskspire:
    </span>
    <span class="text-md md:text-xl font-semibold opacity-90">
      Reach Goals! One task at a time...
    </span>
  </h1>
  <div
    v-if="!big"
    class="absolute top-0 right-0"
  >
    <default-button
      text="⟰"
      theme="x"
      class="w-auto h-min block px-6 pt-2 text-xl"
      :active="true"
      @click="goToHome()"
    />
  </div>
</template >
    
