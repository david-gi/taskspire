<script setup lang="ts">
import { useMainStore } from 'src/store/main'
import DefaultButton from './base/DefaultButton.vue'

defineProps<{ big: boolean }>()
const mainStore = useMainStore()
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
    <span class="text-2xl font-semibold whitespace-nowrap opacity-90">
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
    class="absolute top-0 w-full"
  >
    <default-button
      text="⟰"
      theme="x"
      class="scale-75 float-right w-auto h-min block px-4 mr-4"
      :active="true"
      @click="mainStore.setBoard()"
    />
  </div>
</template >
    
