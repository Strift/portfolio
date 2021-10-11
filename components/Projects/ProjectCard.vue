<template>
  <article class="flex space-x-16 group">
    <div class="relative flex-shrink-0 w-80">
      <nuxt-img
        :src="imageUrl"
        class="z-10 transition-transform duration-150 transform shadow-lg rounded-2xl group-hover:-translate-x-2 group-hover:-translate-y-2"
      />
      <div class="absolute inset-0 bg-indigo-300 shadow-lg rounded-2xl -z-1" />
      <div class="absolute inset-0 transition-transform duration-150 transform translate-x-2 translate-y-2 bg-indigo-100 shadow-lg rounded-2xl -z-2 group-hover:translate-x-2 group-hover:translate-y-2" />
    </div>
    <div class="my-auto space-y-6">
      <div class="font-sans text-xl font-semibold text-gray-700 group-hover:text-indigo-500">
        <slot name="header" />
      </div>
      <BaseText>
        <slot name="description" />
      </BaseText>
      <BaseText class="flex space-x-12 text-gray-500">
        <span v-if="websiteUrl" class="">
          <nuxt-link
            v-if="isInnerLink(websiteUrl)"
            :to="websiteUrl"
            class="flex items-center space-x-2 hover:text-indigo-400"
          >
            <WebsiteIcon />
            <span>{{ cleanUrl(websiteUrl) }}</span>
          </nuxt-link>
          <a
            v-else
            :href="websiteUrl"
            target="_blank"
            class="flex items-center space-x-2 hover:text-indigo-400"
          >
            <WebsiteIcon />
            <span>{{ cleanUrl(websiteUrl) }}</span>
          </a>
        </span>
        <a
          v-if="githubUrl"
          href="https://github.com/Strift/sulfuron-guilds"
          target="_blank"
          class="flex items-center space-x-2 w-60 hover:text-indigo-400"
        >
          <div class="flex w-5 h-5">
            <GithubIcon class="w-4 h-4 m-auto " />
          </div>
          <span>{{ githubRepository(githubUrl) }}</span>
        </a>
      </BaseText>
    </div>
  </article>
</template>

<script>
import PropTypes from '@znck/prop-types'
import BaseText from '~/components/Base/Text.vue'
import WebsiteIcon from '~/components/icons/solid/WebsiteIcon.vue'
import GithubIcon from '~/components/icons/GithubIcon.vue'
import cleanUrl from '~/data/formatters/cleanUrl'
import githubRepository from '~/data/formatters/githubRepository'

export default {
  components: {
    BaseText,
    WebsiteIcon,
    GithubIcon
  },
  props: {
    imageUrl: PropTypes.string.isRequired,
    websiteUrl: PropTypes.string,
    githubUrl: PropTypes.string
  },
  methods: {
    cleanUrl,
    githubRepository,
    isInnerLink (url) {
      return url.startsWith('/')
    }
  }
}
</script>
