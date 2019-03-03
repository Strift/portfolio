<template>
  <div class="absolute h-full w-full">
    <Navbar/>
    <component :is="layout"></component>
  </div>
</template>

<script>
import Navbar from './components/Navbar'

import HomeLayout from './layouts/HomeLayout'

export default {
  name: 'Layout',
  components: {
    Navbar,
    HomeLayout
  },
  computed: {
    layout () {
      return this.$page.frontmatter.layout
    }
  }
}
</script>

<style lang="scss">
@import './styles/theme.scss';

.homepage {
  h1 {
    @apply .font-sans .mb-6 .text-4xl .font-semibold;
    a {
      @apply .hidden;
    }
  }

  p {
    @apply .font-serif .leading-normal .text-lg .text-black .mb-3;
  }
}
</style>
