<script>
import PropTypes from '@znck/prop-types'

export default {
  props: {
    url: PropTypes.string.isRequired,
    target: PropTypes.string.defaultValue('_blank')
  }
}
</script>

<template>
  <a
    :href="url"
    :target="target"
    class="block w-64 py-3 text-xl text-center text-indigo-500 border-2 border-indigo-500 shadow-lg hover:shadow-xl float-on-hover hover:float"
  >
    <slot name="default" />
  </a>
</template>
