<script lang="ts" setup>
import { ICONS } from '~/constants'

const { to = '/' } = defineProps<{
  to?: string
}>()
</script>

<template>
  <NuxtLink
    :to="to"
    class="inline-flex items-center space-x-2 lg:space-x-3 xl:space-x-4 text-color-secondary hover:text-slate-700 hover:dark:text-neutral-200 lg:text-lg xl:text-xl"
  >
    <Icon
      :name="ICONS.ARROW_BACK"
      class="w-5 h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7"
    />
    <span>
      <slot name="default">Back</slot>
    </span>
  </NuxtLink>
</template>
