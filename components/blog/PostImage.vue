<template>
  <figure>
    <BaseImage
      :src="props.src"
      :alt="props.alt"
      :title="props.title"
      :aspect-ratio="`${props.width}/${props.height}`"
      class="rounded-lg mx-auto max-w-full"
    />
    <figcaption v-if="$slots.default">
      <slot />
    </figcaption>
  </figure>
</template>

<script lang="ts" setup>
const props = defineProps<{
  src: string
  alt: string
  title: string
  caption?: string
  width?: string | number
  height?: string | number
}>()

const styles = computed(() => {
  return {
    height: `${props.height}px`,
    width: `${props.width}px`,
  }
})
</script>
