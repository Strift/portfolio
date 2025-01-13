<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { ICONS } from '~/constants'
import { useBlogPostStore } from '~/store/blog'

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
const { title } = storeToRefs(useBlogPostStore())

const INTENT_LINKS = {
  twitter: computed(() => {
    return `https://x.com/intent/tweet?text=${encodeURIComponent(title.value)}&url=${encodeURIComponent('https://laurentcazanove.com&via=StriftCodes')}`
  }),
  bluesky: computed(() => {
    return `https://bsky.app/intent/compose?text=${encodeURIComponent(title.value)} via @laurentcazanove.com`
  }),
}

const getSocialUrl = (social: typeof SOCIAL_LINKS[number]): string => {
  if (!isBlog.value) return social.href

  if (social.name === 'X (formerly Twitter)') return INTENT_LINKS.twitter.value
  if (social.name === 'Bluesky') return INTENT_LINKS.bluesky.value

  return social.href
}
</script>

<template>
  <div class="flex justify-center sm:space-x-2">
    <NuxtLink
      v-for="social in SOCIAL_LINKS"
      :key="social.name"
      :to="getSocialUrl(social)"
      :title="social.name"
      target="_blank"
      class="inline-flex items-center text-color-secondary hover:text-slate-700 hover:dark:text-slate-200 p-2 sm:p-0 active:bg-slate-200 active:dark:bg-slate-800 rounded-md"
    >
      <Icon
        :name="social.icon"
        class="text-2xl"
      />
    </NuxtLink>
  </div>
</template>
