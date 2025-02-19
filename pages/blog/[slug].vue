<script lang="ts" setup>
import type { BlogPostContent } from '~/types'
import { BlogPostImage, BlogOverwatchHighlight, BlogSulfuronAd, BlogKitForm, BlogAdventCalendar, BlogPostLastUpdated } from '#components'
import { useBlogPostStore } from '~/store/blog'

const route = useRoute()

const { data: markdownPost } = await useAsyncData(
  `post-${route.params.slug}`,
  () => queryContent<BlogPostContent>('blog',
    Array.isArray(route.params.slug) ? route.params.slug[0] : route.params.slug,
  ).findOne(),
)

const processedPost = computed(() => {
  if (!markdownPost.value) return null
  return getPostWithLastUpdated(markdownPost.value)
})

const getPostWithLastUpdated = (post: BlogPostContent) => {
  const processed = { ...post,
    // body is reactive, so we need to create a new object
    body: {
      ...post.body,
    },
  }

  if (processed.body?.children) {
    const lastUpdatedComponent = {
      type: 'element',
      tag: 'blog-post-last-updated',
      props: {
        'date': processed.date,
        'updated-at': processed.updatedAt,
      },
      children: [],
    }

    const h1ElementIndex = processed.body.children.findIndex(node => node && node.tag === 'h1')
    if (h1ElementIndex !== -1) {
      // Insert BlogPostLastUpdated component after the h1
      processed.body.children = [
        ...processed.body.children.slice(0, h1ElementIndex + 1),
        lastUpdatedComponent,
        ...processed.body.children.slice(h1ElementIndex + 1),
      ]
    }
  }
  return processed
}

const blogPostStore = useBlogPostStore()
blogPostStore.$patch({
  title: markdownPost.value!.title,
})

useSeoMeta({
  title: markdownPost.value!.title,
  titleTemplate: '%s',
  description: markdownPost.value!.description,
  ogDescription: markdownPost.value!.description,
  ogTitle: markdownPost.value!.title,
})

defineOgImageComponent('OgImageBlogPost', {
  title: markdownPost.value?.title,
  description: markdownPost.value?.description,
  coverSrc: markdownPost.value?.cover,
  coverAlt: markdownPost.value?.coverAlt,
}, { alt: `${markdownPost.value?.title} by Laurent Cazanove` })

const components = {
  'article-image': BlogPostImage,
  'sulfuron-ad': BlogSulfuronAd,
  'highlight': BlogOverwatchHighlight,
  'blog-kit-form': BlogKitForm,
  'blog-advent-calendar': BlogAdventCalendar,
  'blog-post-last-updated': BlogPostLastUpdated,
}
</script>

<template>
  <div class="space-y-12">
    <div
      :class="{ 'sm:flex sm:gap-x-8': markdownPost?.ad }"
    >
      <div :class="{ 'sm:w-3/4': markdownPost?.ad }">
        <BackButton class="mb-6" />
        <BlogAdventCalendar
          v-if="markdownPost?.components?.includes('advent-2024')"
          :day="Number(getDayFromDateString(markdownPost?.date))"
          class="mb-6"
        />
        <article
          v-if="markdownPost"
          class="blog-post-content"
        >
          <ContentRenderer
            v-if="processedPost"
            :value="processedPost"
          >
            <ContentRendererMarkdown
              :value="processedPost"
              :components="components"
            />
          </ContentRenderer>
        </article>
        <BlogAdventCalendar
          v-if="markdownPost?.components?.includes('advent-2024')"
          :day="Number(getDayFromDateString(markdownPost?.date))"
        />
      </div>
      <aside
        v-if="markdownPost && markdownPost.ad"
        class="relative hidden sm:block sm:w-1/4"
      >
        <div class="sticky p-5 bg-slate-100 dark:bg-neutral-900 rounded-lg top-[var(--header-height)]">
          <div class="mb-4 text-color">
            <!-- eslint-disable-next-line vue/no-v-html -->
            <span v-html="markdownPost.ad.text" />
          </div>
          <BlogAdButton :to="markdownPost.ad.buttonLink">
            {{ markdownPost.ad.buttonText }}
          </BlogAdButton>
        </div>
      </aside>
    </div>
    <BlogAboutMe />
    <BlogReadMore
      v-if="markdownPost && markdownPost._path"
      :current-path="markdownPost._path"
      :tags="markdownPost.tags"
    />
  </div>
</template>
