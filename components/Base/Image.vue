<template>
  <div
    class="w-full h-full bg-center bg-cover"
    :style="`background-image: url('${previewUrl}'`"
  >
    <img
      v-if="$config.useLocalImages"
      :src="src"
      :alt="alt"
      :height="height"
      :width="width"
      class="object-cover w-full h-full"
    >
    <img
      v-else
      :data-twic-src="`image:${src}`"
      :alt="alt"
      :height="height"
      :width="width"
      class="object-cover w-full h-full"
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
    width: PropTypes.string,
    maxHeight: PropTypes.string,
    maxWidth: PropTypes.string
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
    cleanPath () {
      return this.src.startsWith('/')
        ? this.src.substring(1)
        : this.src
    },
    previewUrl () {
      const height = this.height || this.maxHeight
      const width = this.width || this.maxWidth

      const resizeTransformation = (height && width)
        ? `contain=${width}x${height}/`
        : ''

      return `${this.$config.twicpicsDomain}/${this.cleanPath}?twic=v1/${resizeTransformation}output=preview`
    }
  }
}
</script>

<style lang="scss" scoped>
img {
  @apply opacity-0 transition-opacity duration-300 ease-in;

  &.twic-done{
    @apply opacity-100;
  }
}
</style>
