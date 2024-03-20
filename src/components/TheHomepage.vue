<script
  setup
  lang="ts"
>
import TheHeader from './TheHeader.vue'
import GoalForm from './homepage/GoalForm.vue'
import GoalContainer from './homepage/GoalContainer.vue'
import OfflineWarning from './homepage/OfflineWarning.vue'
import MobileWarning from './homepage/MobileWarning.vue'
import TheBanner from './homepage/TheBanner.vue'
import TheTagline from './homepage/TheTagline.vue'
import DefinitionsContainer from './homepage/DefinitionsContainer.vue'
</script>

<template>
  <div
    style=""
    class="flex flex-col w-screen h-screen subpixel-antialiased selection:bg-purple/50
          overflow-y-scroll overflow-x-hidden text-center select-none"
  >
    <mobile-warning />

    <offline-warning />


    <the-banner />
    <div class="backdrop-brightness-50 border-y border-purple py-12">
      <the-header :big="true" />
      <br>
      <br>
      <goal-form />
    </div>

    <div class="bg-gradient-to-b to-purple/10 to-75% from-[#111] pt-6">
      <the-tagline />
      <definitions-container />
    </div>

    <goal-container />

    <div
      style=""
      class="backdrop-contrast-125 bg-gradient-to-b from-purple/20 to-gray-transparent to-80%"
    >
      <div class="shadow-xl py-6">
        <img
          class="w-20 md:w-40 mb-6 block mx-auto rounded-full"
          src="../assets/images/logo.png"
        />
        <h3 class="text-green font-bold text-2xl md:text-4xl">
          {{ $t('website.aboutHeader') }}
        </h3>
      </div>

      <div class="flex flex-row flex-wrap justify-center">
        <iframe
          class="w-3/4 xl:w-1/2 aspect-video"
          height="100%"
          src="https://www.youtube-nocookie.com/embed/rkmO4_VpVOk?si=ye1kApzYH92sY-13"
          title="Taskspire Intro Video"
          frameborder="0"
          allow="autoplay; encrypted-media; gyroscope; picture-in-picture; allowfullscreen"
          allowfullscreen
        ></iframe>
      </div>

      <div class="flex flex-row flex-wrap justify-center my-6">
        <p class="w-4/5 sm:w-1/2 text-green/90 sm:text-lg text-normal font-sans text-center whitespace-pre-wrap">
          {{ $t('website.about') }}
        </p>
      </div>
    </div>

    <div class="flex flex-row flex-wrap gap-6 justify-center py-12 backdrop-contrast-150 opacity-75">
      <span class="p-1 text-green whitespace-nowrap">
        © {{ new Date(Date.now()).getFullYear() }} {{ $t('website.name') }}
      </span>
      <span class="p-1 text-orange break-word">{{ $t('website.footer') }}</span>
      <a href="https://ko-fi.com/recursifist">
        <img
          class="rounded-lg w-36 -mt-3 object-scale-down"
          src="../assets/images/ko-fi.jpg"
          alt="Support us on Ko-Fi"
        />
      </a>
    </div>
  </div>
</template>
