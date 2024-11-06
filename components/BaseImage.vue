<template>
  <div v-if="isLocalDevelopment">
    <img
      v-bind="$attrs"
      :src="props.src"
      :alt="props.alt"
      :title="props.title"
      :width="`${props.width}`"
      :height="`${props.height}`"
      :style="`aspect-ratio: ${props.aspectRatio}; object-fit: cover;`"
    >
  </div>
  <TwicImg
    v-else
    v-bind="$attrs"
    :src="props.src"
    :alt="props.alt"
    :title="props.title"
    :width="props.width"
    :height="props.height"
    :ratio="aspectRatio"
  />
</template>

<script lang="ts" setup>
defineOptions({ inheritAttrs: false })

const props = defineProps<{
  alt: string
  src: string
  title?: string
  width?: string | number
  height?: string | number
  aspectRatio?: string
}>()

const isLocalDevelopment = import.meta.dev
</script>
