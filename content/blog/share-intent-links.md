---
title: 'Implementing repository pattern with Vue composables'
date: 2024-12-13
description: Learn how to implement the repository pattern in Nuxt 3 using Vue composables.
cover: /images/articles/covers/vuejs.jpg
coverAlt: Vue.js logo
lang: 'en'
tags:
  - engineering
components:
  - 'advent-2024'
---

The links to my socials are displayed on every page of this blog. I thought it would be a cool UX if these links became content sharing links when visiting a blog post. Let's see how we can build such a component with Vue.

Here's what the `<script>` section can look like:

```vue
<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { ICONS } from '~/constants'
import { useBlogPostStore } from '~/store/blog'

const SOCIAL_LINKS = [
  {
    name: 'Bluesky',
    href: 'https://bsky.app/profile/laurentcazanove.com',
    icon: ICONS.BLUESKY,
  },
  {
    name: 'X (formerly Twitter)',
    href: 'https://x.com/StriftCodes',
    icon: ICONS.TWITTER,
  },
]

// Determine if on a blog page
const route = useRoute()
const isBlog = computed(() => route.path.includes('blog/'))

// Get the current blog post title, e.g. from a store
const { title } = storeToRefs(useBlogPostStore())

// Define intent URLs for sharing blog posts on different platforms
const INTENT_LINKS = {
  // Create a Twitter share intent URL with the current blog post title
  twitter: computed(() => {
    return `https://x.com/intent/tweet?text=${encodeURIComponent(title.value)}&url=${encodeURIComponent('https://laurentcazanove.com&via=StriftCodes')}`
  }),
  // Create a Bluesky share intent URL with the current blog post title
  bluesky: computed(() => {
    return `https://bsky.app/intent/compose?text=${encodeURIComponent(title.value)} via @laurentcazanove.com`
  }),
}

// Dynamically get the appropriate URL based on context
const getSocialUrl = (social: typeof SOCIAL_LINKS[number]): string => {
  // If not on a blog page, return the original profile link
  if (!isBlog.value) return social.href

  // I could make this code cleaner 😅
  if (social.name === 'X (formerly Twitter)') return INTENT_LINKS.twitter.value
  if (social.name === 'Bluesky') return INTENT_LINKS.bluesky.value
}
</script>
````

This was the most important part of our component. The code can be improved for maintainability, but I kept it simple for this example.

The `<template>` section is just a list that renders the social media icons:

```vue
<template>
  <div class="flex justify-center space-x-2">
    <NuxtLink
      v-for="social in SOCIAL_LINKS"
      :key="social.name"
      :to="getSocialUrl(social)"
      :title="social.name"
      target="_blank"
      class="inline-flex items-center space-x-2 text-slate-500 hover:text-slate-700"
    >
      <Icon
        :name="social.icon"
        class="text-2xl"
      />
    </NuxtLink>
  </div>
</template>
```

Please note taht for better accessibility, you should also update the `title` attribute to a value like "Share on Bluesky", instead of simply "Bluesky".

And you're done. Try pressing the social sharing buttons to see if it works. 👇
