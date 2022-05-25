<template>
  <div class="group">
    <!-- <ImageCard
      :image-url="thumbnailUrl"
      :image-alt="thumbnailAlt"
      width="470"
      height="264"
      class="mb-8"
    /> -->
    <ImageCard
      :image-url="thumbnailUrl"
      :image-alt="thumbnailAlt"
      image-class="aspect-video"
      class="mb-8"
    />
    <div class="flex justify-between mb-6">
      <div class="space-x-2">
        <span
          v-for="tag in tags"
          :key="tag"
          class="px-2 py-1 text-xs tracking-wide text-white uppercase bg-indigo-300"
        >
          {{ tag }}
        </span>
      </div>
      <div class="text-gray-400">
        {{ humanReadableDate }}
      </div>
    </div>
    <div class="mb-3 font-sans text-xl font-semibold text-gray-700 group-hover:text-indigo-500">
      {{ title }}
    </div>
    <div v-if="description.length" class="text-gray-500">
      {{ description }}
    </div>
  </div>
</template>

<script>
import PropTypes from '@znck/prop-types'
import { defineComponent, computed } from '@nuxtjs/composition-api'
import ImageCard from '~/components/ImageCard.vue'
import parseDate from '~/data/parsers/parseDate'

export default defineComponent({
  components: { ImageCard },
  props: {
    thumbnailUrl: PropTypes.string.isRequired,
    thumbnailAlt: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.defaultValue(''),
    date: PropTypes.string.isRequired,
    lang: PropTypes.string.defaultValue(''),
    tags: PropTypes.arrayOf(PropTypes.string).isRequired
  },
  setup (props) {
    const humanReadableDate = computed(() => parseDate(props.date))
    return {
      humanReadableDate
    }
  }
})
</script>
