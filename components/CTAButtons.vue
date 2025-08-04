<script lang="ts" setup>
import type { HomePageContent } from '~/types'
import { ICONS } from '~/constants'

const props = defineProps<{
  actions: HomePageContent['actions']
}>()
</script>

<template>
  <div class="mt-6 lg:mt-8 flex flex-row flex-wrap gap-4 sm:gap-6 lg:gap-8 xl:gap-10 cta-buttons">
    <NuxtLink
      v-for="action in props.actions"
      :key="action.text"
      :href="action.href"
      target="_blank"
      class="button inline-flex items-center min-w-36 lg:min-w-48 xl:min-w-64 grow sm:grow-0 justify-center lg:text-lg xl:text-xl"
    >
      <Icon
        :name="ICONS[action.icon]"
        class="mr-2"
      />
      {{ action.text }}
    </NuxtLink>
  </div>
</template>
