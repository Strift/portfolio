<script lang="ts" setup>
import { ICONS } from '~/constants'

const SOCIAL_LINKS = [
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
    href: 'https://github.com/Strift',
    icon: ICONS.GITHUB,
  },
]

const route = useRoute()
const isBlog = computed(() => route.path.includes('blog/'))
const { title } = useBlogMetadata()

const INTENT_LINKS = {
  twitter: computed(() => {
    return `https://x.com/intent/tweet?text=${encodeURIComponent(title.value)}&url=${encodeURIComponent('https://laurentcazanove.com&via=StriftCodes')}`
  }),
}
</script>

<template>
  <div class="flex justify-center space-x-2">
    <NuxtLink
      v-for="social in SOCIAL_LINKS"
      :key="social.name"
      :to="isBlog ? INTENT_LINKS.twitter.value : social.href"
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
