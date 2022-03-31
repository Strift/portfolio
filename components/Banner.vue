<template>
  <div v-if="visible" class="relative w-full py-2 bg-indigo-600 shadow-md">
    <a href="https://www.getrevue.co/profile/esports-tech-news" target="_blank" class="container block mx-auto text-center text-white">
      <span class="lg:hidden">
        🚀 I'm launching <span class="inline-flex items-center space-x-1 "><strong>Esports Tech News</strong><ArrowRightIconVue /></span>
      </span>
      <span class="hidden lg:inline">
        🚀 I'm launching an <strong>Esports & Tech</strong> newsletter. <span class="inline-flex items-center space-x-1 ">Subscribe if you like Code, Esports, & Creative things in between.<ArrowRightIconVue /></span>
      </span>
    </a>
    <button class="absolute top-0 bottom-0 right-0 mr-3 text-lg font-semibold text-indigo-900 hover:text-white" @click="close">
      &times;
    </button>
    <!-- <a href="https://www.getrevue.co/profile/esports-tech-news" target="_blank" class="flex items-center mx-auto space-x-2 font-semibold">
        🚀 I'm launching an <strong>Esports & Tech Newsletter</strong>. Subscribe if you like Code, Esports, & Creative thins in between. Subscribe <ArrowRightIconVue />
      </a> -->
  </div>
</template>

<script>
import PropTypes from '@znck/prop-types'

export default {
  props: {
    visible: PropTypes.bool.isRequired
  },
  methods: {
    close () {
      this.$emit('close')
    }
  }
}
</script>
