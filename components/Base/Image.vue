<template>
  <div
    class="overflow-hidden bg-center bg-cover"
    :style="containerStyle"
  >
    <img
      v-if="$config.useLocalImages"
      :src="src"
      :alt="alt"
      :height="height"
      :width="width"
      class="object-cover object-center w-full h-full"
      :class="imageClass"
    >
    <img
      v-else
      :data-twic-src="`image:${src}`"
      :alt="alt"
      :height="height"
      :width="width"
      class="object-cover object-center w-full h-full twicpics"
      :class="imageClass"
    >
  </div>
</template>

<script>
import { computed, defineComponent, useContext, useMeta } from '@nuxtjs/composition-api'
import PropTypes from '@znck/prop-types'

export default defineComponent({
  props: {
    alt: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    imageClass: PropTypes.string,
    height: PropTypes.string,
    width: PropTypes.string,
    maxHeight: PropTypes.string,
    maxWidth: PropTypes.string,
    preload: PropTypes.bool
  },
  setup (props) {
    const { $config } = useContext()
    const { meta } = useMeta()

    const cleanPath = computed(() => {
      return props.src.startsWith('/')
        ? props.src.substring(1)
        : props.src
    })

    const previewUrl = computed(() => {
      const height = props.height || props.maxHeight
      const width = props.width || props.maxWidth

      const resizeTransformation = (height && width)
        ? `contain=${width}x${height}/`
        : ''

      return `${$config.twicpicsDomain}/${cleanPath.value}?twic=v1/${resizeTransformation}output=preview`
    })

    const containerStyle = computed(() => {
      return (props.height
        ? `height: ${props.height}px;`
        : '') +
        (props.width
          ? `width: ${props.width}px;`
          : '') +
        (props.maxHeight
          ? `max-height: ${props.maxHeight}px;`
          : '') +
        (props.maxWidth
          ? `max-width: ${props.maxWidth}px;`
          : '') +
      `background-image: url('${previewUrl.value}'`
    })

    if (props.preload) {
      meta.value.push({
        rel: 'preload',
        as: 'image',
        href: previewUrl.value
        // media: '',
        // imagesrcset: '',
        // imagesizes: ''
      })
    }

    return {
      cleanPath,
      previewUrl,
      containerStyle
    }
  },
  head: {}
})
</script>

<style lang="scss" scoped>
img.twicpics {
  @apply opacity-0 transition-opacity duration-300 ease-in;

  &.twic-done{
    @apply opacity-100;
  }
}
</style>
