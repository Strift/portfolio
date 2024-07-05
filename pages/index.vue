<script lang="ts" setup>
import type { HomePageContent } from '~/types';

const { data, status } = await useAsyncData('home', () => queryContent<HomePageContent>('home').findOne());
</script>

<template>
	<div v-if="status === 'success' && data">
		<ContentRenderer :value="data" />
		<div>
			👉 <NuxtLink :href="data.actionUrl">
				{{ data.actionText }}
			</NuxtLink>
		</div>
	</div>
</template>

<style scoped>
[data-content-id="content:home.md"] {
  :deep(p) {
    @apply mb-2;
  }
}
</style>
