<script lang="ts" setup>
import type { HomePageContent } from '~/types'
import { ICONS } from '~/constants'

const props = defineProps<{
  actions: HomePageContent['actions']
}>()
</script>

<template>
  <div class="mt-6 flex flex-row flex-wrap gap-4 sm:gap-6 cta-buttons">
    <NuxtLink
      v-for="action in props.actions"
      :key="action.text"
      :href="action.href"
      target="_blank"
      class="button inline-flex items-center min-w-36 grow sm:grow-0 justify-center"
    >
      <Icon
        :name="ICONS[action.icon]"
        class="mr-2"
      />
      {{ action.text }}
    </NuxtLink>
  </div>
</template>
