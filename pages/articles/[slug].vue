<script lang="ts" setup>
import { BlogArticleImage, BlogOverwatchHighlight, BlogSulfuronAd } from '#components'

const route = useRoute()

const { data } = await useAsyncData(
  `article-${route.params.slug}`,
  () => queryContent('articles',
    Array.isArray(route.params.slug) ? route.params.slug[0] : route.params.slug
  ).findOne()
)

const components = {
  'article-image': BlogArticleImage,
  'sulfuron-ad': BlogSulfuronAd,
  'highlight': BlogOverwatchHighlight
}
</script>

<template>
  <div v-if="data">
    <ContentRenderer :value="data">
      <ContentRendererMarkdown :value="data" :components="components" />
    </ContentRenderer>
  </div>
</template>
