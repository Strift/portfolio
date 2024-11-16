<template>
  <figure>
    <NuxtImg
      :src="props.src"
      :alt="props.alt"
      :title="props.title"
      :width="`${props.width}`"
      :height="`${props.height}`"
      sizes="358px sm:640px"
      class="max-h-[50vh] sm:max-w-screen-sm w-full h-auto mx-auto rounded-md object-contain"
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
</script>
