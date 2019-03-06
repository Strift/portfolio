<template>
  <div class="relative">
    <Navbar/>
    <component :is="layout"></component>
  </div>
</template>

<script>
import { Fragment } from 'vue-fragment'
import Navbar from './components/Navbar'

import HomeLayout from './layouts/HomeLayout'
import ArticleLayout from './layouts/ArticleLayout'

export default {
  name: 'Layout',
  components: {
    Fragment,
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
</style>
