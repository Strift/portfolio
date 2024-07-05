<script lang="ts" setup>
import type { HomePageContent } from '~/types'

const { data, status } = await useAsyncData('home', () => queryContent<HomePageContent>('home').findOne())
</script>

<template>
  <div v-if="status === 'success' && data">
    <ContentRenderer :value="data" />
    <div>
      <a :href="data.actionUrl" class="button is-primary is-medium">{{ data.actionText }}</a>
    </div>
  </div>
</template>
