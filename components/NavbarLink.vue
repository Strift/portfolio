<template>
  <NuxtLink
    v-slot="{ href, navigate, isExactActive }"
    :to="to"
    :title="title"
  >
    <span
      :class="textClasses(isExactActive)"
      class="flex items-center space-x-1"
    >
      <ChevronDoubleRightIcon v-if="isExactActive" />
      <a :href="href" @click="navigate">
        <slot name="default" />
      </a>
    </span>
  </NuxtLink>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import PropTypes from '@znck/prop-types'
import ChevronDoubleRightIcon from '~/components/icons/outline/ChevronDoubleRightIcon.vue'

export default defineComponent({
  components: {
    ChevronDoubleRightIcon
  },
  props: {
    to: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    textClass: PropTypes.string.isRequired,
    textHoverClass: PropTypes.string.isRequired
  },
  methods: {
    textClasses (isExactActive) {
      return isExactActive
        ? this.textClass
        : `${this.textClass} hover:${this.textHoverClass}`
    }
  }
})
</script>
