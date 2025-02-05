<script lang="ts" setup>
const { data: posts } = await useAsyncData(
  `learn-mandarin`,
  () => queryContent('learn-mandarin').find(),
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
    <div
      v-for="post in posts"
      :key="post._id"
    >
      <article
        class="blog-post-content"
      >
        <ContentRenderer
          v-if="post"
          :value="post"
          :excerpt="showOnlyExcerpt(post._id)"
        />
      </article>
      <button
        class="link"
        @click="toggleVisibility(post._id)"
      >
        <span v-if="showOnlyExcerpt(post._id)">Read more</span>
        <span v-else>Hide tip</span>
      </button>
    </div>
  </div>
</template>
