<template>
  <div>
    <div class="h-48 bg-cover bg-center" :style="`background-image: url('${thumbnailUrl}')`">
    </div>
    <div class="bg-white p-5 font-serif">
      <div class="font-semibold leading-tight mb-3 text-lg text-gray-800">
        {{ title }}
      </div>
      <div class="text-gray-400 text-sm font-sans">
        <span v-if="lang === 'fr'">French | </span>{{ humanReadableDate }}
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  props: {
    thumbnailUrl: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    },
    lang: {
      type: String,
      default: null
    }
  },
  computed: {
    humanReadableDate () {
      return moment(this.date).format('LL')
    }
  }
}
</script>
