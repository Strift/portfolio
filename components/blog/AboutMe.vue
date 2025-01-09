<script lang="ts" setup>
import type { HomePageContent } from '~/types'

const { data: content } = await useAsyncData('home', () => queryContent<HomePageContent>('home').findOne())
</script>

<template>
  <div
    v-if="content"
    class="px-5 py-6 bg-slate-100 rounded-xl"
  >
    <h2 class="mb-4 heading-2">
      👋 About the author
    </h2>
    <ContentRenderer
      :value="content"
      :excerpt="false"
      class="blog-post-content hidden sm:block"
    />
    <ContentRenderer
      :value="content"
      :excerpt="true"
      class="sm:hidden"
    />
    <CTAButtons :actions="content.actions" />
  </div>
</template>
