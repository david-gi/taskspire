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
      {{ $t('website.name') }}
    </span>
    <br />
    <span class="sm:text-2xl text-lg font-semibold whitespace-nowrap opacity-90">
      {{ $t('website.slogan') }}
    </span>
  </h1>
  <h1
    v-else
    class="absolute w-screen text-green mt-2 line-clamp-1 px-0 sm:px-2 md:px-6 lg:px-9 "
  >
    <span class="text-xl ml-1 font-bold">
      {{ $t('website.name') }}
    </span>
    <span class="sm:text-base text-sm ml-2 font-semibold opacity-90 overflow-clip">
      {{ $t('website.slogan') }}
    </span>
  </h1>
  <div
    v-if="!big"
    class="absolute top-0 right-0"
  >
    <default-button
      text="↩"
      theme="x"
      class="w-fit h-8 block px-2 text-2xl leading-4"
      :active="true"
      @click="goToHome()"
    />
  </div>
</template >
    
