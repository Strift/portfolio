<template>
  <div class="font-sans max-w-screen-sm mx-auto mb-6 shadow-md">
    <div :class="`bg-${teamSlug}-primary p-4 text-gray-300 flex justify-between`">
      <div>
        <span class="font-semibold">Highlight:</span> {{ player }}'s {{ hero }}
      </div>
      <HighlightExpandButton
        class="text-gray-300"
        :expand="isDetailsVisible"
        @toggle="isDetailsVisible = !isDetailsVisible"
      />
    </div>
    <div :class="`bg-${teamSlug}-secondary flex p-4 border-l-16 border-gray-400`">
      <img :src="heroImage" class="h-24 w-24 mr-6 rounded-full border-2 border-gray-400">
      <div class="text-gray-300 flex-grow">
        <slot name="default"></slot>
      </div>
    </div>
    <div v-show="isDetailsVisible" class="border-l-16 border-gray-400">
      <div class="flex p-4 items-center">
        <img :src="playerImage" class="h-24 w-24 mr-4">
        <div class="flex flex-col">
          <div>
            <slot name="details"></slot>
          </div>
          <ul class="list-none flex space-x-3 mt-4">
            <li v-if="twitchUrl">
              <a :href="twitchUrl" target="_blank"><img src="~/assets/images/icons/twitch.svg" class="h-4 w-4"/></a>
            </li>
            <li v-if="youtubeUrl">
              <a :href="youtubeUrl" target="_blank"><img src="~/assets/images/icons/youtube.svg" class="h-4 w-4"/></a>
            </li>
            <li v-if="twitterUrl">
              <a :href="twitterUrl" target="_blank"><img src="~/assets/images/icons/twitter.svg" class="h-4 w-4"/></a>
            </li>
            <li v-if="facebookUrl">
              <a :href="facebookUrl" target="_blank"><img src="~/assets/images/icons/facebook.svg" class="h-4 w-4"/></a>
            </li>
          </ul>
        </div>
        <img :src="teamImage" class="h-24 w-24 ml-4">
      </div>
      <div class="text-sm text-gray-600 italic text-right border-t px-4 py-1">
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
    twitterUrl: { type: String, default: null },
    facebookUrl: { type: String, default: null }
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
      return `/images/articles/overwatch-${this.player.toLowerCase()}.png`
    },
    teamImage () {
      return `/images/articles/overwatch-logo-${this.teamSlug}.png`
    },
    teamSlug () {
      return this.teamAcronym.toLowerCase()
    }
  },
  methods: {
    toggleDetails() {
      this.isDetailsVisible = !this.isDetailsVisible
    }
  }
}
</script>
