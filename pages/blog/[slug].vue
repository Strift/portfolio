<script lang="ts" setup>
import type { BlogPostContent } from '~/types'
import { BlogPostImage, BlogOverwatchHighlight, BlogSulfuronAd, BlogKitForm, BlogAdventCalendar } from '#components'
import { ICONS } from '~/constants'
import { useBlogPostStore } from '~/store/blog'

const route = useRoute()

const { data } = await useAsyncData(
  `post-${route.params.slug}`,
  () => queryContent<BlogPostContent>('blog',
    Array.isArray(route.params.slug) ? route.params.slug[0] : route.params.slug,
  ).findOne(),
)

const blogPostStore = useBlogPostStore()
blogPostStore.$patch({
  title: data.value!.title,
})

useSeoMeta({
  title: data.value!.title,
  description: data.value!.description,
  ogDescription: data.value!.description,
  ogTitle: data.value!.title,
})

defineOgImageComponent('OgImageBlogPost', {
  title: data.value?.title,
  description: data.value?.description,
  coverSrc: data.value?.cover,
  coverAlt: data.value?.coverAlt,
}, { alt: `${data.value?.title} by Laurent Cazanove` })

const components = {
  'article-image': BlogPostImage,
  'sulfuron-ad': BlogSulfuronAd,
  'highlight': BlogOverwatchHighlight,
  'blog-kit-form': BlogKitForm,
  'blog-advent-calendar': BlogAdventCalendar,
}
</script>

<template>
  <div class="space-y-12">
    <div
      :class="{ 'sm:flex sm:gap-x-8': data?.ad }"
    >
      <div :class="{ 'sm:w-3/4': data?.ad }">
        <BackButton class="mb-6" />
        <BlogAdventCalendar
          v-if="data?.components?.includes('advent-2024')"
          :day="Number(getDayFromDateString(data?.date))"
          class="mb-6"
        />
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
        <BlogAdventCalendar
          v-if="data?.components?.includes('advent-2024')"
          :day="Number(getDayFromDateString(data?.date))"
        />
      </div>
      <aside
        v-if="data && data.ad"
        class="relative hidden sm:block sm:w-1/4"
      >
        <div class="sticky p-5 bg-slate-100 rounded-lg top-[var(--header-height)]">
          <div class="mb-4 text-color">
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
        :name="ICONS.PENCIL"
        class="w-4 h-4"
      />
      <span>Last updated on {{ toLocaleDateString(data.updatedAt || data.date) }}.</span>
    </div>
    <BlogKitForm
      v-if="data && data.showKitForm"
      form="keep-in-touch"
    />
    <BlogAboutMe />
    <BlogReadMore
      v-if="data && data._path"
      :current-path="data._path"
      :tags="data.tags"
    />
  </div>
</template>
