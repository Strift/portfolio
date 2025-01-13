<script lang="ts" setup>
import type { MarkdownArticleNav } from '~/types'

const props = defineProps<{
  path: string
}>()

const { data: post, status } = await useAsyncData(
  `blog-post-preview-${props.path}`,
  () => {
    return queryContent<MarkdownArticleNav>('blog')
      .only(['title', 'description', 'cover', 'coverAlt', '_path', 'date'])
      .where({ _path: `/blog/${props.path}` })
      .findOne()
  },
)
</script>

<template>
  <NuxtLink
    v-if="post && status === 'success'"
    v-bind="getPostNuxtLinkProps(post)"
    class="blog-post-preview bg-white dark:bg-slate-950 shadow-lg hover:shadow-xl dark:shadow-slate-800 dark:hover:shadow-slate-700 rounded-md overflow-hidden my-10 mb-12 mx-8 sm:max-w-screen-sm sm:mx-32 block transition-all duration-300 hover:-translate-y-2"
  >
    <NuxtImg
      :src="post.cover"
      :alt="post.coverAlt"
      :title="post.title"
      :width="256"
      :height="136"
      sizes="256px"
      class="max-h-[50vh] w-full h-auto mx-auto object-contain"
      placeholder
    />
    <div class="p-4 sm:px-8 sm:py-6">
      <div class="flex items-baseline">
        <div class="text-lg font-bold mb-2 leading-tight text-color-emphasis">
          {{ post.title }}&nbsp;
        </div>
        <div class="text-color-secondary hidden sm:block">
          &bull; {{ toCalendarDateString(post.date) }}
        </div>
      </div>
      <div class="text-color-secondary">
        {{ post.description }}
      </div>
    </div>
  </NuxtLink>
</template>
