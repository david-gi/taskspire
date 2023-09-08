<script setup lang="ts">
setTimeout(() => {
  document.querySelector('#mobile-warning')?.classList.add('hidden')
}, 10000)
</script>

<template>
  <div
    id="mobile-warning"
    class="sm:hidden landscape:hidden fixed top-0 right-5 z-50
     text-gray-light/75 text-xl motion-safe:animate-pulse"
  >
    <div class="rotate-45">
      <span class="absolute -mt-2 ">↷</span>
      <span class="absolute ml-1 mt-2 text-md rotate-90">█</span>
      <span class="absolute mt-6 rotate-180">↷</span>
    </div>
  </div>
</template>

