<script lang="ts" setup>
import type { MarkdownArticleNav } from '~/types'

const props = defineProps<{
  currentPath: string
  tags: string[]
}>()

const POSTS_ATTRIBUTES = ['title', 'description', 'cover', 'coverAlt', '_path', 'date'] as (keyof MarkdownArticleNav)[]
const MAX_POSTS = 3

const { data: sameTagsPosts } = await useAsyncData(
  `read-more-${props.currentPath}`,
  () => queryContent<MarkdownArticleNav>('blog')
    .only(POSTS_ATTRIBUTES)
    .where({
      _path: { $ne: props.currentPath },
      tags: { $containsAny: props.tags },
    })
    .sort({
      date: -1,
    })
    .limit(MAX_POSTS - 1)
    .find(),
)

const { data: latestPosts } = await useAsyncData(
  `latest-posts`,
  () => queryContent<MarkdownArticleNav>('blog')
    .only(POSTS_ATTRIBUTES)
    .where({
      _path: { $ne: props.currentPath },
    })
    .sort({
      date: -1,
    })
    .limit(MAX_POSTS)
    .find(),
)

const allPosts = computed(() => {
  const posts = [...(sameTagsPosts.value || []), ...(latestPosts.value || [])]
  return posts.slice(0, MAX_POSTS)
})
</script>

<template>
  <div>
    <h2 class="heading-2 mb-4">
      ✍️ Related posts
    </h2>
    <div class="text-color mb-6">
      Read my other articles.
    </div>
    <div class="overflow-x-auto pb-4 sm:pb-0 mb-4 sm:mb-6">
      <div class="flex flex-row min-w-max sm:min-w-0 space-x-8 sm:block sm:space-x-0 sm:space-y-8">
        <BlogPostCard
          v-for="nav in allPosts"
          :key="nav.title"
          :post="nav"
          class="w-[70vw] sm:max-w-full sm:w-full"
        />
      </div>
    </div>
    <BackButton>Back to the blog</BackButton>
  </div>
</template>
