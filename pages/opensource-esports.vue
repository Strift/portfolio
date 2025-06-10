<script setup lang="ts">
import type { MarkdownArticleNav } from '~/types'

useSeoMeta({
  title: 'Open-source esports repositories',
  titleTemplate: '%s',
  description: 'A curated list of open-source esports-related repositories on GitHub.',
  ogDescription: 'A curated list of open-source esports-related repositories on GitHub.',
  ogTitle: 'Open-source esports repositories',
})

const { data: awesomeEsports } = await useAsyncData('awesome-esports', () =>
  queryContent('/awesome/awesome-esports').findOne(),
)

function getGitHubOgImage(url: string) {
  // Expects: https://github.com/OWNER/REPO...
  const match = url.match(/github\.com\/([^/]+)\/([^/]+)/)
  if (!match) return null
  const owner = match[1]
  const repo = match[2]
  return `https://opengraph.githubassets.com/1/${owner}/${repo}`
}

const POSTS_ATTRIBUTES = ['title', 'description', 'cover', 'coverAlt', '_path', 'date'] as (keyof MarkdownArticleNav)[]
const MAX_POSTS = 3

const { data: gamingPosts } = await useAsyncData(
  `read-more-opensource-esports`,
  () => queryContent<MarkdownArticleNav>('blog')
    .only(POSTS_ATTRIBUTES)
    .where({
      tags: { $containsAny: ['esports', 'gaming'] },
    })
    .sort({
      date: -1,
    })
    .limit(MAX_POSTS)
    .find(),
)
</script>

<template>
  <div class="">
    <header class="py-12 text-center">
      <h1 class="text-4xl font-bold mb-4 text-color-emphasis">
        Open-source Esports Repositories
      </h1>
      <p class="max-w-2xl mx-auto text-color">
        A curated list of open-source esports-related repositories on GitHub.
      </p>
    </header>
    <div
      v-if="awesomeEsports"
      class="space-y-8"
    >
      <div
        v-for="category in awesomeEsports.body"
        :key="category.name"
      >
        <h2 class="heading-2 mb-8">
          {{ category.name }}
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
          <div
            v-for="repo in category.repositories"
            :key="repo.name"
          >
            <a
              :href="repo.url"
              target="_blank"
            >
              <img
                :src="getGitHubOgImage(repo.url)"
                class="rounded-md aspect-[2/1] object-cover w-full"
              >
              <div class="mt-4 px-1">
                <span class="text-color-emphasis">
                  {{ repo.name }}
                </span>
                <span class="text-color-secondary">
                  - {{ repo.description }}
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
    <footer class="py-12 text-center">
      <div class="text-color-secondary">
        Repositories curated from the <a
          href="https://github.com/Strift/awesome-esports/blob/main/README.md"
          target="_blank"
          class="link"
        >Awesome Esports</a> project.
      </div>
    </footer>
    <h2 class="heading-2 mb-4">
      ✍️ Related posts
    </h2>
    <div class="text-color mb-6">
      Read my other articles.
    </div>
    <div class="overflow-x-auto pb-4 sm:pb-0 mb-4 sm:mb-6">
      <div class="flex flex-row min-w-max sm:min-w-0 space-x-8 sm:block sm:space-x-0 sm:space-y-8">
        <BlogPostCard
          v-for="nav in gamingPosts"
          :key="nav.title"
          :post="nav"
          class="w-[70vw] sm:max-w-full sm:w-full"
        />
      </div>
    </div>
  </div>
</template>
