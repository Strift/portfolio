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
    alt: nav.title,
  }
}
</script>

<template>
  <NuxtLink
    v-bind="getNuxtLinkProps(props.post)"
    class="group block sm:flex items-center"
  >
    <NuxtImg
      v-bind="getNuxtImgProps(props.post)"
      width="256"
      height="136"
      class="w-64 rounded-lg mb-3 sm:mb-0"
    />
    <div class="px-2 sm:px-8">
      <div class="text-lg font-bold mb-1 sm:mb-2 leading-tight text-color-emphasis">
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
