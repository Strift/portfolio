<template>
  <div>
    <div class="flex mb-8 space-x-8">
      <span
        v-for="tag in tags"
        :key="tag"
        class="px-2 py-1 text-sm font-semibold tracking-wider text-white uppercase bg-indigo-400 shadow-sm lg:text-base lg:px-4 lg:py-3"
      >
        {{ tag }}
      </span>
    </div>
    <!-- <h1 class="mb-8 font-serif text-5xl font-semibold text-white shadow-thin">
      {{ title }}
    </h1> -->
    <div class="flex items-center">
      <img
        src="~/assets/images/me.jpg"
        alt="Me"
        width="64"
        height="64"
        class="flex-shrink-0 rounded-full shadow"
      >
      <div class="ml-6 ">
        <div class="font-semibold text-gray-100 lg:text-lg shadow-thin">
          Laurent "Strift" Cazanove
        </div>
        <div class="text-sm text-gray-200 shadow-thin lg:text-base">
          {{ published }}
        </div>
      </div>
      <TwitterIcon class="w-6 h-6 ml-6 text-white" />
    </div>
  </div>
</template>

<script>
import PropTypes from '@znck/prop-types'
import TwitterIcon from '../icons/TwitterIcon.vue'

export default {
  components: { TwitterIcon },
  props: {
    title: PropTypes.string.isRequired,
    published: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired
  }
}
</script>
