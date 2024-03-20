<script
  setup
  lang="ts"
>

</script>

<template>
  <div
    id="the-tagline"
    class="w-100 scroll-my-4"
  >
    <div class="sm:scale-100 scale-75 mt-6">
      <div class="text-orange text-xl font-semibold -skew-x-6 -skew-y-3 -mt-2 pb-2 drop-shadow">
        {{ $t('homepage.taglineA') }}
      </div>
      <span class="sm:text-4xl text-2xl p-3 text-gray-dark font-black before:rounded
        before:bg-orange before:saturate-150 before:block before:absolute before:-inset-1 
        before:-skew-x-6 before:-skew-y-3 relative inline-block">
        <span class="relative tracking-tight">
          {{ $t('homepage.taglineB') }}
        </span>
      </span>
      <div class="text-orange text-4xl hidden sm:block mt-2 -mb-4 rotate-90">
        ➜
      </div>
    </div>
  </div>
</template>
