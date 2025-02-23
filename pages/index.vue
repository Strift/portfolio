<script lang="ts" setup>
import type { ArticleNav, HomePageContent, ExternalArticleNavContent, MarkdownArticleNav, MediumArticleNav, OgamingArticleNav } from '~/types'

// On the server, when we navigate to the home page with a client-side load, the status is 'idle'
// but the data is available.
const { data: homeContent, status: homeContentStatus } = await useAsyncData('home', () => queryContent<HomePageContent>('home').findOne())

useSeoMeta({
  description: homeContent.value!.metaDescription,
})

defineOgImageComponent('OgImageDefault', {
  title: 'Laurent Cazanove',
  description: homeContent.value!.metaDescription,
}, { alt: 'Laurent Cazanove\'s personal website' })

// Same remark as above regarding the 'idle' status.
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

// Filter nav items by tag
const filteredNavItems = computed(() => {
  if (selectedTag.value === DEFAULT_TAG) {
    return navItems.value
  }
  return navItems.value.filter((post) => {
    return 'tags' in post && post.tags?.includes(selectedTag.value)
  })
})

// Filter nav item by pagination
const PAGINATION_STEP = 5
const numVisibleNavItems = ref(PAGINATION_STEP)
const visibleNavItems = computed(() => {
  if (numVisibleNavItems.value >= filteredNavItems.value.length) {
    return filteredNavItems.value
  }
  return filteredNavItems.value.slice(0, numVisibleNavItems.value)
})
</script>

<template>
  <div>
    <HomeContent
      v-if="homeContent"
      :content="homeContent"
    />
    <div v-else-if="homeContentStatus === 'pending'">
      Loading...
    </div>
    <div v-else>
      Error loading home page. Please try again later.
    </div>
    <section class="mt-8 sm:mt-12">
      <div class="bg-white dark:bg-neutral-950 pb-6 sm:pb-8 sticky top-[var(--header-height)]">
        <h2 class="mb-4 heading-2">
          ✍️ Latest posts
        </h2>
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
          v-for="nav in visibleNavItems"
          :key="nav.title"
          :post="nav"
        />
        <div
          v-if="visibleNavItems.length < filteredNavItems.length"
          class="flex justify-center"
        >
          <button
            class="link"
            @click="numVisibleNavItems += PAGINATION_STEP"
          >
            Show older posts
          </button>
        </div>
        <div
          v-else-if="filteredNavItems.length < navItems.length"
          class="flex justify-center"
        >
          <NuxtLink
            class="link"
            :to="{ query: { posts: undefined } }"
            @click="selectedTag = DEFAULT_TAG"
          >
            Show all posts
          </NuxtLink>
        </div>
      </div>
      <div v-else-if="postsStatus === 'pending'">
        Loading...
      </div>
      <div v-else>
        Error loading posts. Please try again later.
      </div>
    </section>
  </div>
</template>
