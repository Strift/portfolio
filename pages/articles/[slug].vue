<script lang="ts" setup>
import { BlogArticleImage, BlogOverwatchHighlight, BlogSulfuronAd } from '#components'

const route = useRoute()

const { data } = await useAsyncData(
  `article-${route.params.slug}`,
  () => queryContent('articles',
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
  <div
    v-if="data"
    class="article"
  >
    <ContentRenderer :value="data">
      <ContentRendererMarkdown
        :value="data"
        :components="components"
      />
    </ContentRenderer>
  </div>
</template>

<style scoped>
.article {
  :deep(h1) {
    @apply font-title font-bold text-2xl mb-4;
  }

  :deep(h2) {
    @apply font-title font-bold text-xl mt-4 mb-4;
  }

  :deep(p) {
    @apply mb-4 leading-relaxed;
  }

  :deep(figure) {
    @apply my-6;

    & > img {
      @apply rounded-xl;
    }

    & > figcaption {
      @apply text-center mt-2;
    }
  }

  :deep(pre) {
    @apply mb-4;
  }
}
</style>
