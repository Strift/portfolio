---
title: 'Building a content navigation component in Nuxt'
date: 2024-12-10
description: How I built a component to navigate content using Nuxt and the content module.
cover: /images/articles/covers/advent-calendar.jpg
coverAlt: An advent calendar
lang: 'en'
tags:
  - engineering
components:
  - 'advent-2024'
---

# Building a content navigation component in Nuxt

Since I'm writing a blog post every day, I thought it would be great to offer you the ability to navigate between them. So I created a component to navigate between pages.

In this guide I will show you how I built it using [Nuxt](https://nuxt.com) and its [content module](https://content.nuxt.com).

## Fetching the list of posts

The list of blog posts needs to be retrieved when the user navigates to the page. In Nuxt, we use the [`useAsyncData`](https://nuxt.com/docs/api/composables/use-async-data) composable to achieve this.

Since my blog uses the Nuxt Content module, I need to use the [`queryContent`](https://content.nuxt.com/composables/query-content) composable to retrieve the content of my markdown files in the `blog` folder.

Here's what the script section of my Calendar component looks like:

```vue
<script lang="ts" setup>
const props = defineProps<{
  day: number
}>()

const { data: navItems } = await useAsyncData(
    `advent-calendar-${props.day}`,
    () => queryContent('blog')
      .only(['title', '_path', 'date'])
      .where({
        date: {
          $gte: `2024-12-01`,
          $lte: `2024-12-31`,
        },
      })
      .sort({ date: 1 })
      .find(),
)
</script>
```

Now that we have our list of posts, let's see how we can display them.

## Displaying the list of posts

To display the list of post, we're going to iterate through the array of blog posts that we fetched with `queryContent` in our `useAsyncData` hook.

But to make the navigation clear, we want to display the _current_ blog post differently. This way, it will be less confusing for the reader. So we'll use the [`useRoute`](https://nuxt.com/docs/api/composables/use-route) composable to have access to the current path.

Let's first add this to the script section of our component:

```vue
<script lang="ts" setup>
// previous code

const { path: currentPath } = useRoute()
</script>
```

With our list of blog posts and the current path at our disposal, we can now write the code to display the list of posts.

The template section of our component looks like this:

```vue
<template>
  <ul>
    <li
      v-for="item in navItems"
      :key="item._path"
    >
      <div>
        {{ toLocaleShortDateString(item.date) }}
      </div>
      <div v-if="item._path === currentPath">
        {{ item.title }}
      </div>
      <NuxtLink v-else :to="item._path" class="link">
        {{ item.title }}
      </NuxtLink>
    </li>
  </ul>
</template>
```

This code uses a `toLocaleShortDateString` utility to convert the date from a string in the `YYYY-MM-DD` format to a readable string.

You can write your own utility, but here's the one I use:

```ts
// utils/date.js
import dayjs from 'dayjs'

export function toLocaleShortDateString(date: string) {
  return dayjs(date).format('D')
}
```

And that's it! Our component is now ready to display the list of blog posts.

## Final results

The code of this site is open-source, so you can check out the final code here: [Strift/portfolio](https://github.com/strift/portfolio)

You can also see the component in action below this article. 👇

> Photo by <a href="https://unsplash.com/@miracleday?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Elena Mozhvilo</a> on <a href="https://unsplash.com/photos/white-and-red-wooden-cube-LJ5ZYYZAOWo?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
