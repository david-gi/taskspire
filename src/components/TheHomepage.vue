<script setup lang="ts">
import TheHeader from './TheHeader.vue'
import MobileWarning from './base/MobileWarning.vue'
import GoalForm from './goal/GoalForm.vue'
import GoalContainer from './goal/GoalContainer.vue'
</script>

<template>
  <div
    style=""
    class="flex flex-col w-full h-screen subpixel-antialiased selection:bg-purple/50
          overflow-y-scroll text-center no-scrollbar select-none"
  >
    <mobile-warning />
    <the-header :big="true" />
    <div
      id="the-tagline"
      class="w-100 scroll-my-4 mt-2 pt-6 md:pt-20
            bg-gradient-to-b from-blue/30 to-gray-transparent to-80%"
    >
      <div class="sm:scale-100 scale-75">
        <div
          style=""
          class="text-yellow text-xl font-semibold -skew-x-6 -skew-y-3 -mt-2 pb-2 drop-shadow"
        >
          {{ $t('homepage.taglineA') }}
        </div>
        <span
          style=""
          class="sm:text-4xl text-2xl p-3 text-gray-dark font-black before:rounded
        before:bg-yellow before:saturate-150 before:block before:absolute before:-inset-1 
        before:-skew-x-6 before:-skew-y-3 relative inline-block"
        >
          <span class="relative tracking-tight">
            {{ $t('homepage.taglineB') }}
          </span>
        </span>
        <div class="text-yellow text-4xl hidden md:block mt-9 rotate-90">
          ➜
        </div>
      </div>
    </div>

    <h2
      style=""
      class="text-yellow brightness-200 contrast-125 sm:text-2xl text-md -ml-8 pt-6 pb-0 md:pb-6"
    >
      <pre class="font-sans text-center">
            {{ $t('homepage.description') }}
        </pre>
    </h2>

    <goal-form />

    <goal-container />
  </div>
</template>

