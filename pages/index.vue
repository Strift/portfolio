<script lang="ts" setup>
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import type { ArticleNav, HomePageContent, ExternalArticleNavContent, MarkdownArticleNav, MediumArticleNav, OgamingArticleNav } from '~/types'
import { ICONS } from '~/constants'

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
    queryContent<MarkdownArticleNav>('blog').only(['title', 'description', 'cover', 'coverAlt', '_path', 'date', 'updatedAt']).find(),
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

// Filter out the nav items that are not visible.
const numVisibleNavItems = ref(10)
const visibleNavItems = computed(() => {
  if (numVisibleNavItems.value >= navItems.value.length) {
    return navItems.value
  }
  return navItems.value.slice(0, numVisibleNavItems.value)
})

// Show only the excerpt on mobile
const breakpoints = useBreakpoints(
  breakpointsTailwind,
  { ssrWidth: 768 }, // Will enable SSR mode and render like if the screen was 768px wide
)
const showFullHomeContent = ref(false)
const showOnlyExcerpt = computed(() => {
  return breakpoints.smaller('sm').value && !showFullHomeContent.value
})
</script>

<template>
  <div>
    <div
      v-if="homeContent"
      class="home-content"
    >
      <h2>👋 About me</h2>
      <ContentRenderer
        :value="homeContent"
        :excerpt="showOnlyExcerpt"
      />
      <button
        v-if="showOnlyExcerpt"
        class="link"
        @click="showFullHomeContent = true"
      >
        Read more
      </button>
      <div class="mt-6 flex flex-row gap-4 sm:gap-6">
        <NuxtLink
          v-for="action in homeContent.actions"
          :key="action.text"
          :href="action.href"
          target="_blank"
          class="home-cta"
        >
          <Icon
            :name="ICONS[action.icon]"
            class="mr-2"
          />
          {{ action.text }}
        </NuxtLink>
      </div>
    </div>
    <div v-else-if="homeContentStatus === 'pending'">
      Loading...
    </div>
    <div v-else>
      Error loading home page. Please try again later.
    </div>
    <section class="mt-12">
      <h2 class="mb-6 heading-2">
        ✍️ Latest posts
      </h2>
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
          v-if="visibleNavItems.length < navItems.length"
          class="flex justify-center"
        >
          <button
            class="link"
            @click="numVisibleNavItems += 10"
          >
            Show older posts
          </button>
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
