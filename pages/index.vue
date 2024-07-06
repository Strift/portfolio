<script lang="ts" setup>
import type { ArticleNav, HomePageContent } from '~/types'

const { data, status } = await useAsyncData('home', () => queryContent<HomePageContent>('home').findOne())

const { navItems } = await useArticles()

const getNuxtLinkProps = (nav: ArticleNav) => {
  if ('_path' in nav) {
    return {
      to: nav._path,
    }
  }
  return {
    to: nav.url,
    target: '_blank',
  }
}

const getNuxtImgProps = (nav: ArticleNav) => {
  if ('_path' in nav) {
    return {
      src: nav.cover,
      alt: nav.coverAlt,
    }
  }
  return {
    src: nav.image,
    alt: nav.title,
  }
}
</script>

<template>
  <div v-if="status === 'success' && data">
    <ContentRenderer :value="data" />
    <div>
      👉 <NuxtLink :href="data.actionUrl">
        {{ data.actionText }}
      </NuxtLink>
    </div>
    <div class="mt-6">
      <h2 class="text-2xl font-semibold font-title mb-6">
        Latest posts
      </h2>
      <div class="space-y-8">
        <div
          v-for="nav in navItems"
          :key="nav.title"
        >
          <NuxtLink
            v-bind="getNuxtLinkProps(nav)"
            class="group block sm:flex items-center"
          >
            <NuxtImg
              v-bind="getNuxtImgProps(nav)"
              width="256"
              height="136"
              class="w-64 rounded-lg mb-3 sm:mb-0"
            />
            <div class="px-2 sm:px-8">
              <div class="text-lg font-bold mb-1 sm:mb-2 leading-tight">
                {{ nav.title }}
              </div>
              <div
                v-if="'description' in nav"
                class="text-gray-900"
              >
                {{ nav.description }}
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
[data-content-id="content:home.md"] {
  :deep(p) {
    @apply mb-2 text-gray-900;
  }
}
</style>
