<template>
  <img
    v-if="isLocalDevelopment"
    :src="props.src"
    :alt="props.alt"
    :title="props.title"
    :width="`${props.width}`"
    :height="`${props.height}`"
    :style="`aspect-ratio: ${props.aspectRatio}; object-fit: cover;`"
  >
  <TwicImg
    v-else
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

const isLocalDevelopment = process.env.NODE_ENV === 'development'
</script>
