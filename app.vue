<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
useHead({
  link: [
    {
      rel: 'preload',
      type: 'font/woff2',
      href: '/fonts/Chalet-LondonNineteenSixty.woff2',
      as: 'font',
      crossorigin: ''
    },
    {
      rel: 'preload',
      type: 'font/woff2',
      href: '/fonts/Chalet-NewYorkNineteenSixty.woff2',
      as: 'font',
      crossorigin: ''
    }
  ]}
)

</script>