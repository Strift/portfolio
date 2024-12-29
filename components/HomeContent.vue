<script lang="ts" setup>
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { ICONS } from '~/constants'
import type { HomePageContent } from '~/types'

// Show only the excerpt on mobile
const showOnlyExcerpt = ref(true)

const props = defineProps<{
  content: HomePageContent
}>()
</script>

<template>
  <div
    v-if="content"
    class="home-content"
  >
    <h2>👋 About me</h2>
    <div class="sm:hidden">
      <ContentRenderer
        :value="props.content"
        :excerpt="showOnlyExcerpt"
      />
      <button
        v-show="showOnlyExcerpt"
        class="link"
        @click="showOnlyExcerpt = false"
      >
        Read more
      </button>
    </div>

    <ContentRenderer
      :value="props.content"
      class="hidden sm:block"
    />
    <div class="mt-6 flex flex-row gap-4 sm:gap-6">
      <NuxtLink
        v-for="action in content.actions"
        :key="action.text"
        :href="action.href"
        target="_blank"
        class="home-cta"
      >
        <Icon
          :name="ICONS[action.icon]"
          class="mr-2"
        />
        {{ action.text }}
      </NuxtLink>
    </div>
  </div>
</template>
