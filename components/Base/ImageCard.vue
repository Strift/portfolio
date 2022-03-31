<template>
  <div class="relative">
    <div class="relative z-10 transition-transform duration-150 transform shadow-lg group-hover:-translate-x-2 group-hover:-translate-y-2">
      <nuxt-img
        :alt="imageAlt"
        :src="imageUrl"
        :width="width"
        :height="height"
      />
    </div>
    <div class="absolute inset-0 bg-indigo-300 shadow-lg -z-1" />
    <div class="absolute inset-0 transition-transform duration-150 transform translate-x-2 translate-y-2 bg-indigo-100 shadow-lg -z-2 group-hover:translate-x-2 group-hover:translate-y-2" />
  </div>
</template>

<script>
import PropTypes from '@znck/prop-types'

export default {
  props: {
    imageAlt: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    height: PropTypes.string,
    width: PropTypes.string
  }
}
</script>
