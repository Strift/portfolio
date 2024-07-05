<script lang="ts" setup>
import type { ExternalArticleNavContent, MarkdownArticleNav, MediumArticleNav, OgamingArticleNav } from '~/types'

type ArticleNav = MarkdownArticleNav | OgamingArticleNav | MediumArticleNav
// const { data: allArticles } = await useAsyncData('articles', () => {
//   return Promise.all([
//     queryContent<MarkdownArticleNav>('articles').only(['title', 'description', 'cover', 'coverAlt', '_path', 'date']).find(),
//     queryContent<ExternalArticleNavContent>('medium-articles').findOne(),
//     queryContent<ExternalArticleNavContent>('ogaming-articles').findOne()
//   ])
// })

const { data: markdownArticles } = await useAsyncData(
  'md-articles',
  () => queryContent<MarkdownArticleNav>('articles').only(['title', 'description', 'cover', 'coverAlt', '_path', 'date']).find()
)

const { data: mediumArticles } = await useAsyncData(
  'medium-articles',
  () => queryContent<ExternalArticleNavContent<MediumArticleNav>>('medium-articles').findOne()
)

const { data: ogamingArticles } = await useAsyncData(
  'ogaming-articles',
  () => queryContent<ExternalArticleNavContent<OgamingArticleNav>>('ogaming-articles').findOne()
)

const navItems = computed(() => {
  return [markdownArticles.value, mediumArticles.value?.body, ogamingArticles.value?.body]
    .reduce<ArticleNav[]>((nav, articles) => {
      if (articles) {
        return nav.concat(articles)
      }
      return nav
    }, [])
    .sort((a, b) => toMilliseconds(b.date) - toMilliseconds(a.date))
})
</script>

<template>
  <div>
    <div v-for="nav in navItems" :key="nav.title">
      <NuxtLink v-if="'_path' in nav" :to="nav._path">{{ nav.title }}</NuxtLink>
      <NuxtLink v-else :to="nav.url">{{ nav.title }}</NuxtLink>
    </div>
  </div>
</template>
