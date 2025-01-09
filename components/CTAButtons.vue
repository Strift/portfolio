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
      class="inline-flex items-center px-4 py-2 no-underline transition-colors duration-300 border rounded-md text-slate-700 border-slate-700 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400 hover:text-white min-w-36 grow justify-center"
    >
      <Icon
        :name="ICONS[action.icon]"
        class="mr-2"
      />
      {{ action.text }}
    </NuxtLink>
  </div>
</template>
