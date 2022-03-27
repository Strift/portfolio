<template>
  <div>
    <div class="flex mb-8 space-x-8">
      <span
        v-for="tag in tags"
        :key="tag"
        class="px-4 py-3 tracking-wide text-white uppercase bg-indigo-400 shadow-sm"
      >
        {{ tag }}
      </span>
    </div>
    <h1 class="mb-8 font-serif text-5xl font-semibold text-white shadow-thin">
      {{ title }}
    </h1>
    <div class="flex">
      <img
        src="~/assets/images/me.jpg"
        alt="Me"
        width="48"
        height="48"
        class="flex-shrink-0 rounded-full shadow"
      >
      <div class="ml-6 ">
        <div class="text-lg font-semibold text-gray-100">
          Laurent "Strift" Cazanove
        </div>
        <div class="text-gray-200">
          {{ published }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PropTypes from '@znck/prop-types'

export default {
  props: {
    title: PropTypes.string.isRequired,
    published: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired
  }
}
</script>
