<script lang="ts" setup>
import type { HomePageContent } from '~/types'

const { data: content } = await useAsyncData('home', () => queryContent<HomePageContent>('home').findOne())
</script>

<template>
  <section
    v-if="content"
    class="p-5 sm:p-8 bg-slate-100 dark:bg-slate-900 rounded-xl about-content sm:-mx-5"
  >
    <h2 class="mb-4 heading-2">
      👋 About the author
    </h2>
    <ContentRenderer
      :value="content"
      :excerpt="false"
      class="hidden sm:block"
    />
    <ContentRenderer
      :value="content"
      :excerpt="true"
      class="sm:hidden"
    />
    <CTAButtons :actions="content.actions" />
  </section>
</template>
