<script lang="ts" setup>
import type { ArticleNav, ExternalArticleNavContent, MarkdownArticleNav, MediumArticleNav, OgamingArticleNav } from '~/types'

const { data: posts, status: postsStatus } = await useAsyncData('blog-posts', () => {
  return Promise.all([
    queryContent<MarkdownArticleNav>('blog').only(['title', 'description', 'cover', 'coverAlt', '_path', 'date', 'tags', 'updatedAt']).find(),
    queryContent<ExternalArticleNavContent<MediumArticleNav>>('medium-articles').findOne(),
    queryContent<ExternalArticleNavContent<OgamingArticleNav>>('ogaming-articles').findOne(),
  ])
})
const navItems = computed(() => {
  if (!posts.value) {
    return []
  }

  return posts.value
    .reduce<ArticleNav[]>((nav, content) => {
      if (Array.isArray(content)) {
        return nav.concat(content)
      }
      return nav.concat(content.articles)
    }, [])
    .sort((a, b) => compareFromString(a.date, b.date))
})

const DEFAULT_TAG = 'all'
const route = useRoute()
const selectedTag = computed(() => {
  return route.query.posts as string | undefined || DEFAULT_TAG
})
const filteredNavItems = computed(() => {
  if (selectedTag.value === DEFAULT_TAG) {
    return navItems.value
  }
  return navItems.value.filter((post) => {
    return 'tags' in post && post.tags?.includes(selectedTag.value)
  })
})
</script>

<template>
  <div>
    <section class="mt-8 sm:mt-12 mb-6">
      <BackButton class="mb-6 lg:mb-8 xl:mb-10" />
      <div class="bg-white dark:bg-neutral-950 pb-6 sm:pb-8 sticky top-[var(--header-height)] z-10">
        <h1 class="mb-4 heading-2">
          ✍️ Blog
        </h1>
        <BlogCategories
          :default-tag="DEFAULT_TAG"
          :selected-tag="selectedTag"
        />
      </div>
      <div
        v-if="posts"
        class="space-y-8"
      >
        <BlogPostCard
          v-for="nav in filteredNavItems"
          :key="nav.title"
          :post="nav"
        />
      </div>
      <div v-else-if="postsStatus === 'pending'">
        Loading...
      </div>
      <div v-else>
        Error loading posts. Please try again later.
      </div>
    </section>
    <BackButton />
  </div>
</template>
