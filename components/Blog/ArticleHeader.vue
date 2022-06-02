<template>
  <div>
    <div class="flex mb-8 space-x-6">
      <span
        v-for="tag in tags"
        :key="tag"
        class="text-sm font-semibold tracking-wider text-indigo-300 uppercase shadow-sm lg:text-base"
      >
        #{{ tag }}
      </span>
    </div>
    <!-- <h1 class="mb-8 font-serif text-5xl font-semibold text-white shadow-thin">
      {{ title }}
    </h1> -->
    <div class="flex items-center">
      <BaseImage
        src="/images/me.jpg"
        alt="Laurent Cazanove"
        width="64"
        height="64"
        class="rounded-full shadow"
      />
      <div class="ml-6 ">
        <div class="font-semibold text-gray-100 lg:text-lg shadow-thin">
          Laurent "Strift" Cazanove
        </div>
        <div class="text-sm text-gray-200 shadow-thin lg:text-base">
          {{ published }}
        </div>
      </div>
      <div class="ml-6">
        <a href="https://twitter.com/StriftCodes" target="_blank" title="Twitter">
          <TwitterIcon class="w-6 h-6 text-white" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import PropTypes from '@znck/prop-types'
import TwitterIcon from '../icons/TwitterIcon.vue'
import BaseImage from '../Base/Image.vue'

export default {
  components: { TwitterIcon, BaseImage },
  props: {
    title: PropTypes.string.isRequired,
    published: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired
  }
}
</script>
