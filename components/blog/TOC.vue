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

const showAll = ref(true)
</script>

<template>
  <div class="">
    <button
      class="flex items-center space-x-2 text-color-secondary group"
      title="Toggle Table of Contents"
      @click="showAll = !showAll"
    >
      <Icon
        :name="ICONS.LIST"
        class="w-4 h-4 group-hover:text-color-emphasis"
      />
      <div class="text-sm group-hover:text-color-emphasis">
        On this page
      </div>
    </button>
    <nav
      v-show="showAll && tocItems.length > 0"
      class="mt-3"
    >
      <ul class="space-y-1">
        <li
          v-for="item in tocItems"
          :key="item.id"
        >
          <a
            :href="`#${item.id}`"
            class="text-sm transition-colors link"
          >
            {{ item.text }}
          </a>
          <ul
            v-if="item.children"
            class="ml-4 space-y-1 mt-1"
          >
            <li
              v-for="child in item.children"
              :key="child.id"
            >
              <a
                :href="`#${child.id}`"
                class="text-sm transition-colors link"
              >{{ child.text }}</a>
            </li>
          </ul>
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
