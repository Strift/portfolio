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
  <div>
    <div class="mb-6">
      <BackButton />
    </div>
    <div v-if="data">
      <article class="blog-post-content">
        <ContentRenderer :value="data">
          <ContentRendererMarkdown
            :value="data"
            :components="components"
          />
        </ContentRenderer>
      </article>
      <div class="my-12 border rounded-lg px-4 py-2 text-slate-500 text-sm flex items-center space-x-2">
        <Icon
          name="heroicons:pencil"
          class="w-4 h-4"
        />
        <span>Last updated on {{ toLocaleDateString(data.date) }}.</span>
      </div>
      <BlogReadMore
        v-if="data._path"
        :current-path="data._path"
      />
    </div>
  </div>
</template>
