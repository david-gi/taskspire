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
  <div
    v-if="big"
    class="text-center scale-100 pt-6 pb-2 shadow-xl backdrop-brightness-50"
  >
    <img
      class="w-16 sm:w-28 -mt-4 sm:-mt-14 mb-2 sm:mb-0 block sm:inline-block mx-auto 
      rounded-full contrast-75 drop-shadow-[-2px_3px_6px_#000]"
      src="../assets/images/logo.png"
    />
    <div class="text-center sm:text-left ml-0 sm:ml-4 pt-0 sm:pt-4 inline-block">
      <span class="text-blue saturate-75 contrast-150 text-2xl sm:text-4xl font-bold uppercase">
        {{ $t('website.name') }}✧✧✦
      </span>
      <br />
      <span class="opacity-80 text-sm sm:text-base font-semibold whitespace-nowrap decoration-wavy">
        {{ $t('website.slogan') }}
      </span>
    </div>
  </div>
  <h1
    v-else
    class="absolute w-screen mt-2 line-clamp-1 px-0 sm:px-2 md:px-6 lg:px-9 "
  >
    <span class="text-xl ml-1 font-bold text-blue saturate-75 contrast-150">
      {{ $t('website.name') }}✧✧✦
    </span>
    <span class="opacity-75 text-sm sm:text-base ml-2 font-semibold overflow-clip
      align-text-top sm:align-top">
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
    
