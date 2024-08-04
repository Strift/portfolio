<script lang="ts" setup>
import type { ArticleNav, HomePageContent } from '~/types'

const { data: homeContent, status: homeContentStatus } = await useAsyncData('home', () => queryContent<HomePageContent>('home').findOne())

// defineOgImageComponent('Default', {
//   title: 'Laurent Cazanove',
//   description: 'Writer, engineer, and gamer. Offering consulting services in esports, web development, and developer relations.',
// })

const { data: posts, status: postsStatus } = await usePosts()

const navItems = computed(() => {
  if (!(postsStatus.value === 'success' && posts.value)) {
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
  <div v-if="homeContentStatus === 'success' && homeContent">
    <div class="home-content">
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
    <div class="mt-6">
      <h2 class="heading-2 mb-6">
        Latest posts
      </h2>
      <div class="space-y-8">
        <BlogPostCard
          v-for="nav in navItems"
          :key="nav.title"
          :post="nav"
        />
      </div>
    </div>
  </div>
</template>
