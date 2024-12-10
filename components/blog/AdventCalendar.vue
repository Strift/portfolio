<script lang="ts" setup>
import type { MarkdownArticleNav } from '~/types'
import { ICONS } from '~/constants'

const props = defineProps<{
  day: number
}>()

const { path: currentPath } = useRoute()
const { data: navItems } = await useAsyncData(
    `advent-calendar-posts`,
    () => queryContent<MarkdownArticleNav>('blog')
      .only(['title', '_path', 'date'])
      .where({
        date: {
          $gte: `2024-12-01`,
          $lte: `2024-12-31`,
        },
      })
      .sort({
        date: 1,
      })
      .find(),
)

const showAll = ref(false)
</script>

<template>
  <div class="px-4 py-2 text-sm border rounded-lg text-slate-500">
    <div class="flex items-center space-x-2 ">
      <Icon
        :name="ICONS.CALENDAR"
        class="w-4 h-4"
      />
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
    </div>
    <ul
      v-show="showAll"
      class="mt-2"
    >
      <li
        v-for="item in navItems"
        :key="item._path"
        class="flex items-baseline space-x-2 space-y-2"
      >
        <div class="w-12">
          {{ toLocaleShortDateString(item.date) }}
        </div>
        <div v-if="item._path === currentPath">
          {{ item.title }}
        </div>
        <NuxtLink
          v-else
          :to="item._path"
          class="link"
        >
          {{ item.title }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
