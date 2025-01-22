<script lang="ts" setup>
import { ICONS } from '~/constants'
</script>

<template>
  <NuxtLink
    to="/"
    class="inline-flex items-center space-x-2 text-color-secondary hover:text-slate-700 hover:dark:text-neutral-200"
  >
    <Icon
      :name="ICONS.ARROW_BACK"
      class="w-5 h-5"
    />
    <span>
      <slot name="default">Back</slot>
    </span>
  </NuxtLink>
</template>
