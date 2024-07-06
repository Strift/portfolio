<script lang="ts" setup>
import type { MarkdownArticleNav } from '~/types'

const props = defineProps<{
  currentPath: string
}>()

const { data: navItems } = await useAsyncData(
  `read-more-${props.currentPath}`,
  () => queryContent<MarkdownArticleNav>('articles')
    .only(['title', 'description', 'cover', 'coverAlt', '_path', 'date'])
    .where({ _path: { $ne: props.currentPath } })
    .sort({
      date: -1,
    })
    .limit(2)
    .find(),
)
</script>

<template>
  <div>
    <h2 class="heading-2 mb-4">
      Latest posts
    </h2>
    <div class="text-color mb-6">
      Read my other other articles.
    </div>
    <div class="space-y-8">
      <BlogPostCard
        v-for="nav in navItems"
        :key="nav.title"
        :post="nav"
      />
    </div>
  </div>
</template>
