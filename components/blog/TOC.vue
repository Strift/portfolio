<script lang="ts" setup>
import { ICONS } from '~/constants'

const props = defineProps<{
  currentPath: string
}>()

// Fetch the current page content to get its TOC
const { data: pageContent } = await useAsyncData(
  `toc-${props.currentPath}`,
  () => queryContent(props.currentPath)
    .only(['body'])
    .findOne(),
)

// Extract TOC from the page content
const tocItems = computed(() => {
  return pageContent.value?.body?.toc?.links || []
})

const showAll = ref(false)
</script>

<template>
  <div class="">
    <div class="flex items-center space-x-2 text-color-secondary">
      <Icon
        :name="ICONS.LIST"
        class="w-4 h-4"
      />
      <div class="text-sm">
        Table of Contents
      </div>
    </div>
    <nav
      v-show="tocItems.length > 0"
      class="mt-3"
    >
      <ul class="space-y-1">
        <li
          v-for="item in tocItems"
          :key="item.id"
          :class="[
            'flex items-start',
            item.depth === 2 && 'ml-0',
            item.depth === 3 && 'ml-4',
            item.depth === 4 && 'ml-8',
            item.depth === 5 && 'ml-12',
            item.depth === 6 && 'ml-16',
          ]"
        >
          <a
            :href="`#${item.id}`"
            class="link hover:text-primary transition-colors"
            @click="showAll = false"
          >
            {{ item.text }}
          </a>
        </li>
      </ul>
    </nav>
    <div
      v-if="tocItems.length === 0"
      v-show="showAll"
      class="mt-2 text-xs text-color-tertiary"
    >
      No headings found in this article.
    </div>
  </div>
</template>
