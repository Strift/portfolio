<template>
  <BaseContainer class="max-w-screen-lg space-y-24">
    <div v-if="$fetchState.pending" class="mx-auto text-center text-gray-500">
      Loading {{ repository }}...
    </div>
    <div v-else-if="$fetchState.error" class="mx-auto text-center text-gray-500">
      An error occurred while fetching {{ repository }}.
    </div>
    <div v-else class="esports-repos" v-html="content" />
    <div class="flex justify-center">
      <a :href="`https://github.com/${repository}`" target="_blank" class="flex items-center mx-auto text-gray-400 hover:text-indigo-400">
        <span>Update this page via Github</span>
        <ExternalLinkIcon />
      </a>
    </div>
  </BaseContainer>
</template>

<script>
import ExternalLinkIcon from '~/components/icons/solid/ExternalLinkIcon.vue'
import BaseContainer from '~/components/Base/Container.vue'
import markdownToHtml from '~/data/parsers/markdownToHtml'
import { getReadme } from '~/data/services/github'

export default {
  components: {
    BaseContainer,
    ExternalLinkIcon
  },
  fetchOnServer: false,
  layout: 'default',
  data: () => ({
    repository: 'Strift/awesome-esports',
    content: null
  }),
  async fetch () {
    const readme = await getReadme('Strift', 'awesome-esports')
    this.content = markdownToHtml(readme).replaceAll('<a href=', '<a target="_blank" href=')
  }
}
</script>

<style>

.esports-repos p {
  @apply text-gray-500;
}

.esports-repos ul {
  @apply space-y-2;
}

.esports-repos ul li {
  @apply text-gray-500;
}

.esports-repos ul li a {
  @apply font-semibold text-gray-700 hover:text-indigo-400 ;
}

.esports-repos h1 {
  @apply font-semibold text-4xl mb-3;
}

.esports-repos h1 + p {
  @apply text-lg text-gray-400 mb-8;
}

.esports-repos h2 {
  @apply font-semibold text-2xl text-indigo-500 mt-10 mb-8;
}
</style>
