<script lang="ts" setup>
import { EXTERNAL_LINKS } from '~/constants'

const links = [
  {
    name: 'Bluesky',
    href: EXTERNAL_LINKS.bluesky,
    icon: 'ri:bluesky-fill',
  },
  {
    name: 'X (formerly Twitter)',
    href: EXTERNAL_LINKS.twitter,
    icon: 'ri:twitter-fill',
  },
  {
    name: 'LinkedIn',
    href: EXTERNAL_LINKS.linkedin,
    icon: 'ri:linkedin-fill',
  },
  {
    name: 'GitHub',
    href: EXTERNAL_LINKS.github,
    icon: 'ri:github-fill',
  },
]
</script>

<template>
  <div class="flex justify-center space-x-2">
    <NuxtLink
      v-for="social in links"
      :key="social.name"
      :to="social.href"
      :title="social.name"
      target="_blank"
      class="inline-flex items-center space-x-2 text-slate-500 hover:text-slate-700"
    >
      <Icon
        :name="social.icon"
        class="text-2xl"
      />
    </NuxtLink>
  </div>
</template>
