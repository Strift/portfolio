<script lang="ts" setup>
useHeadSafe({
  htmlAttrs: {
    lang: 'en',
  },
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - Laurent Cazanove` : 'Laurent Cazanove'
  },
})
</script>

<template>
  <NuxtLayout>
    <ErrorButton />
    <NuxtPage />
  </NuxtLayout>
</template>
