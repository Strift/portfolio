<template>
  <div class="absolute h-full w-full">
    <Navbar/>
    <component :is="layout"></component>
  </div>
</template>

<script>
import Navbar from './components/Navbar'

import HomeLayout from './layouts/HomeLayout'
import ArticleLayout from './layouts/ArticleLayout'

export default {
  name: 'Layout',
  components: {
    Navbar,
    HomeLayout,
    ArticleLayout
  },
  computed: {
    layout () {
      return this.$page.frontmatter.layout
    }
  },
  // beforeRouteLeave (to, from, next) {
  //   console.log('leaving...')
  //   setTimeout(() => {
  //     next()
  //   }, 980)
  // }
}
</script>

<style lang="scss">
@import './styles/theme.scss';
@import './styles/home.scss';
</style>
