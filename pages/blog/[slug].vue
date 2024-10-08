<script lang="ts" setup>
import { BlogPostImage, BlogOverwatchHighlight, BlogSulfuronAd } from '#components'
import type { BlogPostContent } from '~/types'

const route = useRoute()

const { data } = await useAsyncData(
  `post-${route.params.slug}`,
  () => queryContent<BlogPostContent>('blog',
    Array.isArray(route.params.slug) ? route.params.slug[0] : route.params.slug,
  ).findOne(),
)

useSeoMeta({
  title: data.value!.title,
  description: data.value!.description,
  ogDescription: data.value!.description,
  ogTitle: data.value!.title,
})

defineOgImage({
  url: data.value!.cover,
  alt: data.value!.coverAlt,
})

// TODO: custom OG image
// defineOgImageComponent('BlogPost', {
//   title: data.value?.title,
//   description: data.value?.description,
// })

const components = {
  'article-image': BlogPostImage,
  'sulfuron-ad': BlogSulfuronAd,
  'highlight': BlogOverwatchHighlight,
}
</script>

<template>
  <div class="space-y-12">
    <div class="sm:flex gap-x-8">
      <div :class="{ 'sm:w-3/4': data?.ad }">
        <BackButton class="mb-6" />
        <article
          v-if="data"
          class="blog-post-content"
        >
          <ContentRenderer :value="data">
            <ContentRendererMarkdown
              :value="data"
              :components="components"
            />
          </ContentRenderer>
        </article>
      </div>
      <aside
        v-if="data && data.ad"
        class="relative hidden sm:block sm:w-1/4"
      >
        <div class="sticky p-5 bg-slate-100 rounded-lg top-[var(--header-height)]">
          <div class="mb-3 text-color">
            <!-- eslint-disable-next-line vue/no-v-html -->
            <span v-html="data.ad.text" />
          </div>
          <BlogAdButton :to="data.ad.buttonLink">
            {{ data.ad.buttonText }}
          </BlogAdButton>
        </div>
      </aside>
    </div>
    <div
      v-if="data"
      class="flex items-center px-4 py-2 space-x-2 text-sm border rounded-lg text-slate-500"
    >
      <Icon
        name="heroicons:pencil"
        class="w-4 h-4"
      />
      <span>Last updated on {{ toLocaleDateString(data.updatedAt || data.date) }}.</span>
    </div>
    <BlogAboutMe />
    <BlogReadMore
      v-if="data && data._path"
      :current-path="data._path"
    />
  </div>
</template>
