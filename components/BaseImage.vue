<template>
  <TwicImg
    :src="props.src"
    :alt="props.alt"
    :ratio="aspectRatio"
  />
</template>

<script lang="ts" setup>
const props = defineProps<{
  alt: string
  src: string
  aspectRatio?: string
}>()
</script>
