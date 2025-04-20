<script lang="ts" setup>
import { SOCIAL_LINKS } from '~/constants'
</script>

<template>
  <div class="flex justify-center sm:space-x-2">
    <NuxtLink
      v-for="social in SOCIAL_LINKS"
      :key="social.name"
      :to="social.href"
      :title="social.name"
      target="_blank"
      class="inline-flex items-center text-color-secondary hover:text-slate-700 hover:dark:text-neutral-200 p-2 sm:p-0 active:bg-slate-200 active:dark:bg-neutral-800 rounded-md"
    >
      <Icon
        :name="social.icon"
        class="text-2xl"
      />
    </NuxtLink>
  </div>
</template>
