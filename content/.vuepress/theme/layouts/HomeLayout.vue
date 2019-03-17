<template>
  <div class="home-page absolute h-screen w-full">
    <div class="lg:h-full flex flex-col">
      <div class="mx-6 lg:mx-0 mt-auto flex flex-col lg:flex-row">
        <img src="/images/me.jpg" class="mt-24 mb-12 lg:my-auto lg:ml-24 xl:ml-32 mx-auto lg:mx-0 moveable lg:h-64 xl:h-96 lg:w-64 xl:w-96" :style="portraitStyles" ref="photo">
        <div class="lg:w-1/2 lg:ml-20 lg:pr-12 xl:pr-32 lg:flex">
          <div v-show="introVisible" class="my-auto">
            <Content />
            <a href="mailto:lau.cazanove@gmail.com" class="button no-underline mt-4">{{ $page.frontmatter.actionText }}</a>
          </div>
        </div>
      </div>
      <HomeFooter class="mt-10 lg:mt-auto"/>
    </div>
  </div>
</template>

<script>
import HomeFooter from '../components/HomeFooter'

export default {
  name: 'HomeLayout',
  components: {
    HomeFooter
  },
  data () {
    return {
      portraitVisible: true,
      introVisible: true
    }
  },
  computed: {
    portraitStyles () {
      if (this.portraitVisible) return ''
      const destination = this.$store.state.navbarLogo.getBoundingClientRect()
      const xDiff = destination.x - this.$refs.photo.getBoundingClientRect().x
      const yDiff = destination.y - this.$refs.photo.getBoundingClientRect().y
      return `transform: translate3d(${xDiff}px, ${yDiff}px, 0) scale(0.104)`
    }
  },
  mounted () {
    this.$router.beforeEach((to, from, next) => {
      if (from.path !== '/')
        return next()

      this.introVisible = false
      this.portraitVisible = false
      setTimeout(() => {
        next()
      }, 480)
    })
  }
}
</script>

<style lang="scss" scoped>
.moveable {
  transition: 500ms;
  transform-origin: 0 0;
  // transition-delay: 250ms;
}
</style>
