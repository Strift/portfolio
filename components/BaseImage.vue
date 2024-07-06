<template>
  <TwicImg
    :src="props.src"
    :alt="props.alt"
    :title="props.title"
    :width="props.width"
    :height="props.height"
    :ratio="aspectRatio"
  />
</template>

<script lang="ts" setup>
const props = defineProps<{
  alt: string
  src: string
  title?: string
  width?: string | number
  height?: string | number
  aspectRatio?: string
}>()
</script>
