<script lang="ts" setup>
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
    class="about-content"
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
    <CTAButtons
      :actions="props.content.actions"
    />
  </div>
</template>
