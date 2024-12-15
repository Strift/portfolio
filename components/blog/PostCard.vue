<script lang="ts" setup>
import type { ArticleNav } from '~/types'

const props = defineProps<{
  post: ArticleNav
}>()
</script>

<template>
  <NuxtLink
    v-bind="getPostNuxtLinkProps(props.post)"
    class="group block sm:flex items-center"
  >
    <div class="w-full sm:w-[256px] mb-5 sm:mb-0 flex-shrink-0">
      <BaseImage
        v-bind="getPostNuxtImgProps(props.post)"
        aspect-ratio="256/136"
        class="rounded-lg"
      />
    </div>
    <div class="sm:px-8">
      <div class="text-lg font-bold mb-2 sm:mb-2 leading-tight text-color-emphasis">
        {{ props.post.title }}
      </div>
      <div class="text-color-secondary">
        <template v-if="'updatedAt' in props.post">
          {{ toCalendarDateString(props.post.updatedAt || props.post.date) }}
        </template>
        <template v-else>
          {{ toCalendarDateString(props.post.date) }}
        </template>
      </div>
    </div>
  </NuxtLink>
</template>
