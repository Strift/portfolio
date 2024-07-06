<script lang="ts" setup>
import { BlogArticleImage, BlogOverwatchHighlight, BlogSulfuronAd } from '#components'
import type { BlogPostContent } from '~/types'

const route = useRoute()

const { data } = await useAsyncData(
  `article-${route.params.slug}`,
  () => queryContent<BlogPostContent>('articles',
    Array.isArray(route.params.slug) ? route.params.slug[0] : route.params.slug,
  ).findOne(),
)

const components = {
  'article-image': BlogArticleImage,
  'sulfuron-ad': BlogSulfuronAd,
  'highlight': BlogOverwatchHighlight,
}
</script>

<template>
  <div>
    <div class="mb-6">
      <NuxtLink
        to="/"
        class="flex items-center space-x-2 text-slate-500 hover:text-slate-700"
      >
        <Icon
          name="heroicons:arrow-left"
          class="w-5 h-5"
        />
        <span>Back</span>
      </NuxtLink>
    </div>
    <div v-if="data">
      <article class="blog-post">
        <ContentRenderer :value="data">
          <ContentRendererMarkdown
            :value="data"
            :components="components"
          />
        </ContentRenderer>
      </article>
      <div class="my-12 border rounded-lg px-4 py-2 text-color text-sm">
        Last updated on {{ toLocaleDateString(data.date) }}.
      </div>
      <BlogReadMore
        v-if="data._path"
        :current-path="data._path"
      />
    </div>
  </div>
</template>

<style src="~/assets/css/blog-post.css" scoped />
