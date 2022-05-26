<template>
  <div
    class="bg-center bg-cover"
    :style="containerStyle"
  >
    <img
      v-if="$config.useLocalImages"
      :src="src"
      :alt="alt"
      :height="height"
      :width="width"
      class="object-cover w-full h-full"
      :class="imageClass"
    >
    <img
      v-else
      :data-twic-src="`image:${src}`"
      :alt="alt"
      :height="height"
      :width="width"
      class="object-cover w-full h-full"
      :class="imageClass"
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
    },
    containerStyle () {
      return (this.height
        ? `height: ${this.height}px;`
        : '') +
        (this.width
          ? `width: ${this.width}px;`
          : '') +
        (this.maxHeight
          ? `max-height: ${this.maxHeight}px;`
          : '') +
        (this.maxWidth
          ? `max-width: ${this.maxWidth}px;`
          : '') +
      `background-image: url('${this.previewUrl}'`
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
