<script setup lang="ts">
import { onMounted, ref } from 'vue'

const circleClasses = 'absolute rounded-full p-6 motion-safe:animate-pulse blur-sm'
const index = ref(1)

function delayedCycle() {
  if (index.value > 4) return
  const delay = 5000 + (4000 * Math.random())
  setTimeout(() => {
    index.value += 1
    delayedCycle()
  },
    delay)
}

onMounted(() => delayedCycle())
</script>

<template>
  <div class="absolute w-screen h-screen top-0 left-0 bg-gray-dark/75 z-50">

    <div class="absolute w-full top-1/2 mt-20 font-bold text-green text-2xl text-center">
      <span class="bg-gray-dark/75 py-4 px-12 rounded-full">
        <span class="motion-safe:animate-pulse">
          <span class="text-blue absolute motion-safe:animate-pulse">{{ $t('homepage.loadingGoal' + index) }}</span>
          {{ $t('homepage.loadingGoal' + index) }}
        </span>
      </span>
    </div>

    <div class="absolute w-fit h-fit top-1/2 left-1/2 -mt-12 motion-safe:animate-spin">
      <div
        class="translate-y-1 translate-x-1 bg-purple "
        :class="[circleClasses]"
      ></div>
      <div
        class="translate-y-1 -translate-x-1 bg-blue "
        :class="[circleClasses]"
      ></div>
      <div
        class="-translate-y-1 bg-green "
        :class="[circleClasses]"
      ></div>
      <div
        class="bg-pink"
        :class="[circleClasses]"
      ></div>
      <div
        class="bg-pink blur-none"
        :class="[circleClasses]"
      >
      </div>
    </div>
  </div>
</template>