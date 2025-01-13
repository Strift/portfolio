<script lang="ts" setup>
import type { MarkdownArticleNav } from '~/types'

const props = defineProps<{
  defaultTag: string
  selectedTag: string
}>()

const { data: navigation } = await useAsyncData('navigation', async () => {
  return await queryContent<MarkdownArticleNav>('blog').only(['tags']).find()
})

const tagsCount = computed(() => {
  if (!navigation.value) return {}

  return navigation.value.reduce((acc, article) => {
    article.tags?.forEach((tag) => {
      acc[tag] = (acc[tag] || 0) + 1
    })
    return acc
  }, {} as Record<string, number>)
})

const sortedTags = computed(() => {
  return Object.entries(tagsCount.value)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
})
</script>

<template>
  <div>
    <div class="flex gap-x-2 sm:gap-x-4 overflow-x-auto sm:overflow-x-hidden pb-3 -mb-2 sm:mb-0 sm:pb-0">
      <NuxtLink
        class="text-color-muted hover:text-color-emphasis active:bg-slate-200 active:dark:bg-slate-800 rounded-md px-2 py-1 sm:p-0"
        :class="{ 'text-color-emphasis': selectedTag === props.defaultTag }"
        replace
        :to="{ query: { posts: undefined } }"
      >
        All
      </NuxtLink>
      <NuxtLink
        v-for="[tag, count] in sortedTags"
        :key="tag"
        class="text-color-muted space-x-2 flex items-baseline shrink-0 hover:text-color-emphasis active:bg-slate-200 active:dark:bg-slate-800 rounded-md px-2 py-1 sm:p-0 active:text-color-emphasis"
        :to="{ query: { posts: tag } }"
        replace
      >
        <div :class="{ 'text-color-emphasis': selectedTag === tag }">
          {{ capitalize(tag) }}
        </div>
        <div
          class="text-sm rounded-md bg-slate-50 dark:bg-slate-800 px-2 border border-slate-100 dark:border-slate-700"
          :class="{ 'text-color-subtle': selectedTag === tag }"
        >
          {{ count }}
        </div>
      </NuxtLink>
    </div>
  </div>
</template>
