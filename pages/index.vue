<script lang="ts" setup>
import type { HomePageContent } from '~/types'

const { data, status } = await useAsyncData('home', () => queryContent<HomePageContent>('home').findOne())

const { navItems } = await useArticles()
</script>

<template>
  <div v-if="status === 'success' && data">
    <div class="home-content">
      <ContentRenderer :value="data" />
    </div>
    <div>
      👉 <NuxtLink
        :href="data.actionUrl"
        class="link"
      >
        {{ data.actionText }}
      </NuxtLink>
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

<style scoped>
.home-content {
  :deep(p) {
    @apply mb-2 text-color leading-relaxed;
  }

  :deep(strong) {
    @apply text-color-emphasis;
  }
}
</style>
