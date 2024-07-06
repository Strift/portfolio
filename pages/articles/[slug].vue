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

  :deep(h3) {
    @apply font-title font-bold text-lg mt-4 mb-4;
  }

  :deep(p) {
    @apply mb-4 leading-loose text-gray-900;
  }

  :deep(:not(h1):not(h2):not(h3):not(h4):not(h5):not(h6) > a) {
    @apply underline text-black;
  }

  :deep(figure) {
    @apply my-8;

    & > img {
      @apply rounded-xl max-w-lg mx-auto;
    }

    & > figcaption {
      @apply text-center mt-4;

      & > p {
        @apply text-gray-700;
      }
    }
  }

  :deep(pre) {
    @apply rounded-lg p-5 overflow-x-auto my-6 -m-5 bg-slate-100;

    & code {
      padding-bottom: 0 !important;
    }
  }

  :deep(p > code) {
    @apply border text-sm px-1 py-1 rounded-md text-nowrap;
  }

  :deep(ul) {
    @apply list-disc list-inside;
  }

  :deep(hr) {
    @apply my-6;
  }
}
</style>
