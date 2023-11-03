<script setup lang="ts">
import { useMainStore } from 'src/store/main'
import { onMounted } from 'vue'
import TheHeader from './TheHeader.vue'
import MobileWarning from './base/MobileWarning.vue'
import GoalInput from './goal/GoalInput.vue'
import GoalContainer from './goal/GoalContainer.vue'

const mainStore = useMainStore()
onMounted(() => mainStore.fetchBoards())
</script>

<template>
  <div
    style=""
    class="flex flex-col w-full h-screen subpixel-antialiased
          overflow-y-scroll text-center no-scrollbar select-none"
  >
    <mobile-warning />
    <the-header :big="true" />
    <div
      id="the-tagline"
      class="w-100 scroll-my-4 mt-2 pt-6 md:pt-20
            bg-gradient-to-b from-blue/30 to-gray-transparent to-80%"
    >
      <div
        style=""
        class="text-yellow text-xl font-semibold -skew-x-6 -skew-y-3 -mt-2 pb-2 drop-shadow"
      >
        Goals are good for motivation...
      </div>
      <span
        style=""
        class="text-4xl p-2 text-gray-dark font-black before:rounded
        before:bg-yellow before:saturate-150 before:block before:absolute before:-inset-1 
        before:-skew-x-6 before:-skew-y-3 relative inline-block"
      >
        <span class="relative">
          Systems Get You There
        </span>
      </span>
      <div class="text-yellow text-4xl hidden md:block mt-9 rotate-90">
        ➜
      </div>
    </div>

    <h2
      style=""
      class="text-yellow brightness-200 contrast-125 text-2xl -ml-8 pt-6 pb-0 md:pb-6"
    >
      <pre class="font-sans text-center">
          Simple goal management utilizing
          Kanban and the Porodomo technique.
          Supercharged by advanced AI.
        </pre>
    </h2>

    <goal-input />

    <goal-container />
  </div>
</template>

