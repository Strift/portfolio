<script lang="ts" setup>
import type { MandarinTip } from '~/types'

const { data: pageContent } = await useAsyncData('learn-mandarin-index',
  () => queryContent('learn-mandarin').findOne(),
)

const { data: posts } = await useAsyncData(
  `learn-mandarin-posts`,
  () => queryContent<MandarinTip>('learn-mandarin/').find(),
  { default: () => [] },
)

const visiblePosts = ref<Record<string, boolean>>({})

const showOnlyExcerpt = (postId: string) => {
  const isVisible = visiblePosts.value[postId]
  return isVisible
    ? false // i.e. show full post
    : true
}

const toggleVisibility = (postId: string) => {
  if (visiblePosts.value[postId]) {
    visiblePosts.value[postId] = !visiblePosts.value[postId]
  }
  else {
    visiblePosts.value[postId] = true
  }
}
</script>

<template>
  <div>
    <BackButton class="mb-6" />
    <ContentRenderer
      v-if="pageContent"
      :value="pageContent"
      class="mb-6 page-content"
    />
    <div
      v-for="(post, postIndex) in posts"
      :key="post._id"
      class="block px-6 py-6 mx-8 my-10 mb-12 overflow-hidden transition-all duration-300 bg-white border rounded-md shadow-lg mandarin-tip-content border-slate-100 dark:bg-slate-950 hover:shadow-xl dark:shadow-slate-800 dark:hover:shadow-slate-700"
    >
      <ContentRenderer
        v-if="post"
        :value="post"
      >
        <div class="flex justify-between align-baseline">
          <h2>{{ post.title }}</h2>
          <div class="text-sm text-color-secondary">
            Tip {{ postIndex+1 }}/{{ posts.length }}
          </div>
        </div>
        <ContentRendererMarkdown
          :value="post"
          :excerpt="showOnlyExcerpt(post._id)"
          class="inline-block"
        />
        <button
          v-if="showOnlyExcerpt(post._id)"
          class="ml-1 link"
          @click="toggleVisibility(post._id)"
        >
          Read more
        </button>
      </ContentRenderer>
      <div class="flex justify-center">
        <button
          v-if="!showOnlyExcerpt(post._id)"
          class="mx-auto mt-4 link"
          @click="toggleVisibility(post._id)"
        >
          Hide tip
        </button>
      </div>
    </div>
    <div class="text-color text-pretty">
      Any feedback? Reach out to let me know!
    </div>
  </div>
</template>
