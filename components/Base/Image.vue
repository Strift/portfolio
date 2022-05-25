<template>
  <div :style="containerStyle">
    <img
      v-if="$config.useLocalImages"
      :src="src"
      :alt="alt"
      :height="height"
      :width="width"
      class="object-fill w-full h-full"
    >
    <img
      v-else
      :data-twic-src="`image:${src}`"
      :alt="alt"
      :height="height"
      :width="width"
      class="object-fill w-full h-full"
    >
  </div>
</template>

<script>
import PropTypes from '@znck/prop-types'

export default {
  props: {
    alt: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    imageClass: PropTypes.string,
    height: PropTypes.string,
    width: PropTypes.string
  },
  computed: {
    // An issue currently prevents using dynamic attributes
    // https://github.com/nuxt/nuxt.js/issues/9317
    // dynamicSrcAttribute () {
    //   return this.$config.useLocalImages
    //     ? 'src'
    //     : 'data-twic-src'
    // },
    // dynamicSrcValue () {
    //   return this.$config.useLocalImages
    //     ? this.src
    //     : `image:${this.src}`
    // },
    containerStyle () {
      return (this.height ? `height: ${this.height}px;` : '') +
        (this.width ? `width: ${this.width}px` : '')
    }
  }
}
</script>
