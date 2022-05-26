<template>
  <article class="flex space-x-16 group">
    <ImageCard
      :image-alt="title"
      :image-url="imageUrl"
      height="148"
      width="320"
      class="flex-shrink-0 w-80"
      image-class="aspect-video"
    />
    <div class="my-auto space-y-6">
      <div class="font-sans text-xl font-semibold text-gray-700 group-hover:text-indigo-500">
        {{ title }}
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
import ImageCard from '~/components/ImageCard.vue'
import WebsiteIcon from '~/components/icons/solid/WebsiteIcon.vue'
import GithubIcon from '~/components/icons/GithubIcon.vue'
import cleanUrl from '~/data/formatters/cleanUrl'
import githubRepository from '~/data/formatters/githubRepository'

export default {
  components: {
    BaseText,
    WebsiteIcon,
    GithubIcon,
    ImageCard
  },
  props: {
    title: PropTypes.string.isRequired,
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
