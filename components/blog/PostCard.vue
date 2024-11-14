<script lang="ts" setup>
import type { ArticleNav } from '~/types'

const props = defineProps<{
  post: ArticleNav
}>()

const getNuxtLinkProps = (nav: ArticleNav) => {
  if ('_path' in nav) {
    return {
      to: nav._path,
    }
  }
  return {
    to: nav.url,
    target: '_blank',
  }
}

const getNuxtImgProps = (nav: ArticleNav) => {
  if ('_path' in nav) {
    return {
      src: nav.cover,
      alt: nav.coverAlt,
    }
  }
  return {
    src: nav.image,
    alt: `Illustration with the title "${nav.title}"`,
  }
}
</script>

<template>
  <NuxtLink
    v-bind="getNuxtLinkProps(props.post)"
    class="group block sm:flex items-center"
  >
    <div class="w-full sm:w-[256px] mb-5 sm:mb-0 flex-shrink-0">
      <BaseImage
        v-bind="getNuxtImgProps(props.post)"
        aspect-ratio="256/136"
        class="rounded-lg"
      />
    </div>
    <div class="sm:px-8">
      <div class="text-lg font-bold mb-2 sm:mb-2 leading-tight text-color-emphasis">
        {{ props.post.title }}
      </div>
      <div
        v-if="'description' in props.post"
        class="text-color"
      >
        {{ props.post.description }}
      </div>
    </div>
  </NuxtLink>
</template>
