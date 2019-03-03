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
  },
  mounted () {
    console.log('Layout')
  }
}
</script>

<style lang="scss">
@import './styles/theme.scss'
</style>
