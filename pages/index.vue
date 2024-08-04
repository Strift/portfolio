<script lang="ts" setup>
import type { ArticleNav, HomePageContent, ExternalArticleNavContent, MarkdownArticleNav, MediumArticleNav, OgamingArticleNav } from '~/types'

// On the server, when we navigate to the home page with a client-side load, the status is 'idle'
// but the data is available.

const { data: homeContent, status: homeContentStatus } = await useAsyncData('home', () => queryContent<HomePageContent>('home').findOne())

// defineOgImageComponent('Default', {
//   title: 'Laurent Cazanove',
//   description: 'Writer, engineer, and gamer. Offering consulting services in esports, web development, and developer relations.',
// })

const { data: posts, status: postsStatus } = await useAsyncData('blog-posts', () => {
  return Promise.all([
    queryContent<MarkdownArticleNav>('blog').only(['title', 'description', 'cover', 'coverAlt', '_path', 'date']).find(),
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
</script>

<template>
  <div>
    <div
      v-if="homeContent"
      class="home-content"
    >
      <ContentRenderer :value="homeContent" />
      <div>
        👉 <NuxtLink
          :href="homeContent.actionUrl"
          target="_blank"
        >
          {{ homeContent.actionText }}
        </NuxtLink>
      </div>
    </div>
    <div v-else-if="homeContentStatus === 'pending'">
      Loading...
    </div>
    <div v-else>
      Error loading home page. Please try again later.
    </div>
    <div class="mt-6">
      <h2 class="heading-2 mb-6">
        Latest posts
      </h2>
      <div
        v-if="posts"
        class="space-y-8"
      >
        <BlogPostCard
          v-for="nav in navItems"
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
    </div>
  </div>
</template>
