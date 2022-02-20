<template>
  <div>
    <div class="max-w-screen-md mx-auto text-white">
      <h1 class="mb-8 font-serif text-5xl font-semibold">
        {{ title }}
      </h1>
      <div v-if="description" class="mb-8 font-sans text-lg">
        {{ description }}
      </div>
      <div class="flex">
        <img
          src="~/assets/images/me.jpg"
          alt="Me"
          width="48"
          height="48"
          class="rounded-full shadow"
        >
        <div class="ml-6">
          <div class="text-lg font-semibold">
            Laurent "Strift" Cazanove
          </div>
          <div>{{ published }}</div>
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
    description: PropTypes.string
  }
}
</script>
