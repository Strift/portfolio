<template>
  <div class="relative">
    <BaseImage
      :alt="imageAlt"
      :src="imageUrl"
      :width="width"
      :height="height"
      :max-width="maxWidth"
      :max-height="maxHeight"
      class="relative z-10 transition-transform duration-150 transform shadow-lg group-hover:-translate-x-2 group-hover:-translate-y-2"
      :class="imageClass"
    />
    <div class="absolute inset-0 bg-indigo-300 shadow-lg -z-1" />
    <div class="absolute inset-0 transition-transform duration-150 transform translate-x-2 translate-y-2 bg-indigo-100 shadow-lg -z-2 group-hover:translate-x-2 group-hover:translate-y-2" />
  </div>
</template>

<script>
import PropTypes from '@znck/prop-types'
import BaseImage from '~/components/Base/Image.vue'

export default {
  components: {
    BaseImage
  },
  props: {
    imageAlt: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    imageClass: PropTypes.string,
    height: PropTypes.string,
    width: PropTypes.string,
    maxHeight: PropTypes.string,
    maxWidth: PropTypes.string
  }
}
</script>
