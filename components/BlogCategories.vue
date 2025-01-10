<script lang="ts" setup>
import type { MarkdownArticleNav } from '~/types'

const props = defineProps<{
  selectedTag: string
}>()

const { data: navigation } = await useAsyncData('navigation', async () => {
  return await queryContent<MarkdownArticleNav>('blog').only(['tags']).find()
})

const tagsCount = computed(() => {
  if (!navigation.value) return {}

  return navigation.value.reduce((acc, article) => {
    article.tags?.forEach((tag) => {
      acc[tag] = (acc[tag] || 0) + 1
    })
    return acc
  }, {} as Record<string, number>)
})

const sortedTags = computed(() => {
  return Object.entries(tagsCount.value)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
})

const emit = defineEmits(['update:selectedTag'])

const updateSelected = (tag: string) => {
  if (props.selectedTag === tag) {
    emit('update:selectedTag', '')
  }
  else {
    emit('update:selectedTag', tag)
  }
}
</script>

<template>
  <div class="flex gap-x-4">
    <button
      v-for="[tag, count] in sortedTags"
      :key="tag"
      class="text-color-muted space-x-2 flex items-center shrink-0 hover:text-color-emphasis"
      :class="{ '': selectedTag === tag }"
      @click="updateSelected(tag)"
    >
      <div :class="{ 'text-color-emphasis': selectedTag === tag }">
        {{ capitalize(tag) }}
      </div>
      <div
        class="text-sm rounded-md bg-slate-50 px-2 border border-slate-100"
        :class="{ 'text-color-subtle': selectedTag === tag }"
      >
        {{ count }}
      </div>
    </button>
  </div>
</template>
