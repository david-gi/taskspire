<script setup lang="ts">
import TheHeader from './TheHeader.vue'
import GoalForm from './homepage/GoalForm.vue'
import GoalContainer from './homepage/GoalContainer.vue'
import OfflineWarning from './homepage/OfflineWarning.vue'
import MobileWarning from './homepage/MobileWarning.vue'
</script>

<template>
  <div
    style=""
    class="flex flex-col w-screen h-screen subpixel-antialiased selection:bg-purple/50
          overflow-y-scroll overflow-x-hidden text-center select-none"
  >
    <mobile-warning />

    <offline-warning />

    <div class="bg-gradient-to-b from-[#111] from-10% to-purple/10">
      <the-header :big="true" />
      <div
        id="the-tagline"
        class="w-100 scroll-my-4 pt-6 sm:pt-12 md:pt-20"
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
          <div class="text-yellow text-4xl hidden sm:block mt-9 -mb-6 rotate-90">
            ➜
          </div>
        </div>
      </div>

      <div class="flex flex-row flex-wrap gap-6 justify-center pt-6 sm:pt-12 md:pt-20">
        <iframe
          width="400"
          height="230"
          src="https://www.youtube-nocookie.com/embed/rkmO4_VpVOk?si=ye1kApzYH92sY-13"
          title="Taskspire Intro Video"
          frameborder="0"
          allow="autoplay; encrypted-media; gyroscope; picture-in-picture; allowfullscreen"
          allowfullscreen
        ></iframe>
      </div>

      <h2
        style=""
        class="text-yellow brightness-200 contrast-125 sm:text-2xl text-md -ml-8 pt-6 pb-0 md:pb-6"
      >
        <pre class="font-sans text-center">
            {{ $t('website.description') }}
        </pre>
        <pre class="font-sans text-center text-md text-base opacity-80 -mt-4 italic">
          {{ $t('website.footer') }}
      </pre>
      </h2>

      <goal-form />

      <div class="flex flex-row flex-wrap justify-center mb-9">
        <p
          class="w-4/5 sm:w-1/2 sm:text-lg text-normal text-yellow saturate-50 font-sans text-center whitespace-pre-wrap">
          {{ $t('website.explaination') }}
        </p>
      </div>
    </div>

    <goal-container />

    <div
      style=""
      class="backdrop-contrast-125 bg-gradient-to-b from-purple/20 to-gray-transparent to-80%"
    >
      <div class="shadow-xl py-6">
        <img
          class="w-20 my-6 block mx-auto rounded-4xl"
          src="../assets/images/logo.png"
        />
        <h3 class="text-blue contrast-150 font-bold text-xl">
          {{ $t('website.aboutHeader') }}
        </h3>
      </div>
      <div class="flex flex-row flex-wrap justify-center mt-6">
        <p class="w-4/5 sm:w-1/2 text-blue/90 sm:text-lg text-normal font-sans text-center whitespace-pre-wrap">
          {{ $t('website.about') }}
        </p>
      </div>
    </div>

    <div class="flex flex-row flex-wrap gap-6 justify-center py-12 backdrop-contrast-150 opacity-75">
      <span class="text-green whitespace-nowrap">
        © {{ new Date(Date.now()).getFullYear() }} {{ $t('website.name') }}
      </span>
      <span class="text-pink break-word">{{ $t('website.footer') }}</span>
    </div>
  </div>
</template>

