<template>
  <NuxtLink
    v-slot="{ href, navigate, isExactActive }"
    :to="to"
    :title="title"
  >
    <span
      :class="{ 'text-sky-800': !isExactActive, 'text-gray-700': isExactActive }"
      class="flex hover:text-sky-600 items-center space-x-1"
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
import ChevronDoubleRightIcon from '~/components/icons/outline/ChevronDoubleRightIcon.vue'

export default defineComponent({
  components: {
    ChevronDoubleRightIcon
  },
  props: {
    to: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  }
})
</script>
