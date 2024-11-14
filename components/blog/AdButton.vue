<script lang="ts" setup>
import { ICONS } from '~/constants'

defineProps<{
  to: string
}>()
</script>

<template>
  <NuxtLink
    :to="to"
    target="_blank"
    class="inline-flex items-center justify-center w-full px-2 py-2 space-x-2 rounded-md hover:bg-slate-700 border-slate-700 border text-slate-700 hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2"
  >
    <span>
      <slot name="default" />
    </span>
    <Icon
      :name="ICONS.ARROW_RIGHT"
      class="w-5 h-5"
    />
  </NuxtLink>
</template>
