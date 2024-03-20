<script
  setup
  lang="ts"
>
</script>

<template>
  <h2 class="sm:text-2xl text-md -ml-8">

    <pre class="text-orange font-sans text-center whitespace-pre-wrap">
      {{ $t('website.description') }}
    </pre>

    <pre class="text-green font-sans text-center text-base whitespace-pre-wrap 
    rounded p-9 pt-12 backdrop-brightness-75
    mx-0 md:mx-24 lg:mx-48 mb-4">
      {{ $t('website.definitions') }}
    </pre>

    <pre class="text-orange font-sans text-center text-base italic">
        {{ $t('website.footer') }}
    </pre>

  </h2>
</template>
https://tailwindcss.com/docs/text-wrap