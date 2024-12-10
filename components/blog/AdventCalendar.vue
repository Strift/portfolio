<template>
  <div>
    <div class="flex items-baseline space-x-2">
      <p>
        This is day {{ props.day }} of <em>Advent of Blog</em> where I write 1 blog post per day.
      </p>
      <button
        class="link"
        @click="showAll = !showAll"
      >
        {{ showAll ? 'Hide posts' : 'Show posts' }}
      </button>
    </div>
    <ul v-show="showAll">
      <li
        v-for="item in navItems"
        :key="item._path"
        class="flex items-center space-x-2"
      >
        <div class="text-slate-500 w-14">
          {{ toLocaleShortDateString(item.date) }}.
        </div>
        <div v-if="item._path === currentPath">
          {{ item.title }}
        </div>
        <NuxtLink
          v-else
          :to="item._path"
        >
          {{ item.title }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import type { MarkdownArticleNav } from '~/types'

const props = defineProps<{
  day: number
}>()

const { path: currentPath } = useRoute()

const { data: navItems } = await useAsyncData(
  `advent-calendar-${props.day}`,
  () => queryContent<MarkdownArticleNav>('blog')
    .only(['title', 'description', 'cover', 'coverAlt', '_path', 'date'])
    .where({
      date: {
        $gte: `2024-12-01`,
        $lte: `2024-12-31`,
      },
    })
    .sort({
      date: -1,
    })
    .find(),
)

const showAll = ref(false)
</script>
