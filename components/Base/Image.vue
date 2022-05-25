<template>
  <img
    v-if="$config.useLocalImages"
    :src="src"
    alt="alt"
    :width="width"
    :height="height"
  >
  <img
    v-else
    :data-twic-src="twicpicsSrc"
    :alt="alt"
    :width="width"
    :height="height"
  >
</template>

<script>
import PropTypes from '@znck/prop-types'

export default {
  props: {
    alt: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    height: PropTypes.string,
    width: PropTypes.string
  },
  computed: {
    twicpicsSrc () {
      return `image:${this.src}`
    }
  }
}
</script>
