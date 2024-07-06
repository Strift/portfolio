<script lang="ts" setup>
import type { HomePageContent } from '~/types'

const { data, status } = await useAsyncData('home', () => queryContent<HomePageContent>('home').findOne())

const { navItems } = await useArticles()
</script>

<template>
  <div v-if="status === 'success' && data">
    <div class="home-content">
      <ContentRenderer :value="data" />
      <div>
        👉 <NuxtLink
          :href="data.actionUrl"
        >
          {{ data.actionText }}
        </NuxtLink>
      </div>
    </div>
    <div class="mt-6">
      <h2 class="heading-2 mb-6">
        Latest posts
      </h2>
      <div class="space-y-8">
        <BlogPostCard
          v-for="nav in navItems"
          :key="nav.title"
          :post="nav"
        />
      </div>
    </div>
  </div>
</template>

<style src="~/assets/css/home.css" />
