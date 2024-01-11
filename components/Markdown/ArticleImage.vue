<template>
  <figure>
    <BaseImage
      :src="src"
      :alt="alt"
      :title="title"
      :width="`${width}`"
      :height="`${height}`"
      class="max-w-full mx-auto rounded-lg lg:max-w-2xl"
    />
    <figcaption v-if="$slots.default">
      <slot />
    </figcaption>
  </figure>
</template>

<script>
import PropTypes from '@znck/prop-types'
import BaseImage from '~/components/Base/Image.vue'

export default {
  components: {
    BaseImage
  },
  props: {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    caption: PropTypes.string,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }
}
</script>

<style>

</style>
