<template>
  <div class="font-sans max-w-md mx-auto mb-6 shadow-md">
    <div class="bg-seo-primary p-4 text-grey-lightest flex justify-between">
      <div>
        <span class="font-semibold">Highlight:</span> {{ player }}'s {{ hero }}
      </div>
      <HighlightExpandButton
        class="text-grey-lightest"
        :expand="isDetailsVisible"
        @toggle="isDetailsVisible = !isDetailsVisible"
      />
    </div>
    <div class="bg-seo-secondary flex p-4 border-l-16 border-grey-light">
      <img :src="heroImage" class="h-24 w-24 mr-6">
      <div class="text-grey-lightest flex-grow">
        <slot name="default"></slot>
      </div>
    </div>
    <div v-show="isDetailsVisible" class="border-l-16 border-grey-light">
      <div class="flex p-4">
        <img :src="playerImage" class="h-24 w-24 mr-6">
        <div class="flex flex-col">
          <slot name="details"></slot>
          <ul class="list-reset flex mt-auto">
            <li v-if="twitchUrl">
              <a :href="twitchUrl" target="_blank"><img src="/icons/twitch.svg" class="h-5 w-5"/></a>
            </li>
            <li v-if="youtubeUrl" class="ml-3">
              <a :href="youtubeUrl" target="_blank"><img src="/icons/youtube.svg" class="h-5 w-5"/></a>
            </li>
            <li v-if="twitterUrl" class="ml-3">
              <a :href="twitterUrl" target="_blank"><img src="/icons/twitter.svg" class="h-5 w-5"/></a>
            </li>
          </ul>
        </div>
        <img :src="teamImage" class="h-24 w-24 ml-6">
      </div>
      <div class="text-sm text-grey-dark italic text-right border-t px-4 py-1">
        <slot name="source"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import HighlightExpandButton from './HighlightExpandButton'

export default {
  components: {
    HighlightExpandButton
  },
  props: {
    player: { type: String, required: true },
    hero: { type: String, required: true },
    teamAcronym: { type: String, required: true },
    twitchUrl: { type: String, default: null },
    youtubeUrl: { type: String, default: null },
    twitterUrl: { type: String, default: null }
  },
  data() {
    return {
      isDetailsVisible: false
    }
  },
  computed: {
    heroImage () {
      return `https://www.overbuff.com/assets/images/heroes/${this.hero.toLowerCase()}.png?v=a74d045`
    },
    playerImage () {
      return `/images/overwatch-${this.player.toLowerCase()}.png`
    },
    teamImage () {
      return `/images/overwatch-logo-${this.teamAcronym.toLowerCase()}.png`
    }
  },
  methods: {
    toggleDetails() {
      this.isDetailsVisible = !this.isDetailsVisible
    }
  }
}
</script>
