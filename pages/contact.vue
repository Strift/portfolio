<script lang="ts" setup>
import type { ContactPageContent } from '~/types'

const { data: content } = await useAsyncData('contact', () => queryContent<ContactPageContent>('contact').findOne())
</script>

<template>
  <div
    v-if="content"
  >
    <section class="mt-8 sm:mt-12 mb-6">
      <BackButton class="mb-6" />
      <h1 class="mb-4 heading-2">
        💼 Contact
      </h1>
      <ContentRenderer
        :value="content"
        class="page-content"
      />
      <CTAButtons :actions="content.actions" />
    </section>
  </div>
</template>
