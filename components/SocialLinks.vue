<script lang="ts" setup>
import { ICONS } from '~/constants'

const links = [
  {
    name: 'Bluesky',
    href: 'https://bsky.app/profile/laurentcazanove.com',
    icon: ICONS.BLUESKY,
  },
  {
    name: 'X (formerly Twitter)',
    href: 'https://x.com/StriftCodes',
    icon: ICONS.TWITTER,
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/laurentcazanove/',
    icon: ICONS.LINKEDIN,
  },
  {
    name: 'GitHub',
    href: 'https://github.com/StriftCodes',
    icon: ICONS.GITHUB,
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
