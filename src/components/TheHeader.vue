<script setup lang="ts">

defineProps<{ big: boolean }>()
</script>

<template>
  <h1
    v-if="big"
    class="text-greenx brightness-125 text-center subpixel-antialiased scale-110 py-3"
  >
    <span
      id="header-name"
      class="text-green text-4xl font-black"
    >
      Taskspire
    </span>
    <br />
    <span class="text-2xl font-semibold whitespace-nowrap opacity-90">
      Reach Goals, one task at a time
    </span>
  </h1>
  <h1
    v-else
    class="absolute w-full text-green -mt-10 line-clamp-1 -mb-10 subpixel-antialiased"
  >
    <span
      id="header-name"
      class="text-2xl font-bold"
    >
      Taskspire:
    </span>
    <span class="text-xl font-semibold opacity-90">
      Reach Goals, one task at a time
    </span>
  </h1>
</template >
    
