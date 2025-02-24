<script setup lang="ts">
const props = defineProps<{
  src: string
}>()
</script>

<template>
  <iframe
    width="350"
    height="197"
    :src="props.src"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen
  />
</template>
