<template>
  <div class="group">
    <div class="bg-center bg-cover group-hover:shadow-lg h-60 mb-6 rounded-lg shadow-md" :style="`background-image: url('${thumbnailUrl}')`" />
    <div class="flex justify-between mb-4">
      <div class="space-x-2">
        <span
          v-for="tag in tags"
          :key="tag"
          class="bg-gray-300 px-2 py-1 rounded-sm text-white text-xs tracking-wide uppercase"
        >
          {{ tag }}
        </span>
      </div>
      <div class="text-gray-400">
        {{ humanReadableDate }}
      </div>
    </div>
    <div class="font-sans font-semibold group-hover:text-indigo-700 mb-2 text-gray-700 text-xl">
      {{ title }}
    </div>
    <div class="text-gray-500">
      {{ description }}
    </div>
    <!-- <div class="mt-4 text-right">
      <span class="group-hover:text-sky-700">Read article</span>
    </div> -->
  </div>
</template>

<script>
import { defineComponent, computed } from '@nuxtjs/composition-api'
import { arrayValidator } from 'vue-props-validation'
import moment from 'moment'

export default defineComponent({
  props: {
    thumbnailUrl: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: null
    },
    date: {
      type: String,
      required: true
    },
    lang: {
      type: String,
      default: ''
    },
    tags: {
      type: Array,
      validator: arrayValidator({
        type: String
      }),
      required: true
    }
  },
  setup (props) {
    const humanReadableDate = computed(() => moment(props.date).format('LL'))
    return {
      humanReadableDate
    }
  }
})
</script>
