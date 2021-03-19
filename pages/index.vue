<template>
    <div class="h-screen flex flex-col">
      <Navbar/>
      <div class="mx-6 lg:mx-0 flex flex-col lg:flex-row mt-auto">
        <img src="~assets/images/me.jpg" class="mt-24 mb-12 lg:my-auto lg:ml-24 xl:ml-32 mx-auto lg:mx-0 moveable lg:h-64 xl:h-96 lg:w-64 xl:w-96" :style="portraitStyles" ref="photo">
        <div class="lg:w-1/2 lg:ml-20 lg:pr-12 xl:pr-32 lg:flex">
          <transition
            :duration="480"
            leave-active-class="animated fadeOut"
          >
            <div v-show="introVisible" class="my-auto">
              <nuxt-content :document="page" class="home-page" />
              <a href="mailto:lau.cazanove@gmail.com" class="button no-underline mt-4">{{ page.actionText }}</a>
            </div>
          </transition>
        </div>
      </div>
      <SocialsFooter class="mt-10 lg:mt-auto"/>
    </div>
</template>

<script>
import Navbar from '~/components/Navbar.vue'
import SocialsFooter from '~/components/SocialsFooter.vue'

export default {
  name: 'Home',
  components: {
    Navbar,
    SocialsFooter
  },
  async asyncData ({ $content }) {
    const page = await $content('home').fetch()
    return {
      page
    }
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
      if (from.path !== '/') {
        next()
        return
      }

      this.introVisible = false
      this.portraitVisible = false
      setTimeout(() => {
        next()
      }, 480)
    })
  }
}
</script>

<style lang="scss">
.moveable {
  transition: 500ms;
  transform-origin: 0 0;
  /* // transition-delay: 250ms; */
}

.home-page {
  h1 {
    @apply font-sans mb-6 text-4xl font-bold;
    a {
      @apply hidden;
    }
  }
  
  p {
    @apply font-serif leading-normal text-xl text-gray-900 mb-3;
  }
}

.button {
  @apply font-serif text-lg text-gray-900 px-4 py-2 border border-gray-900 inline-block relative;
}

.button:before {
  content: '';
  @apply bg-gray-900 absolute w-0 top-0 left-0 h-full;
  transition: all 150ms linear;
  z-index: -1;
}

.button:hover {
  @apply text-gray-300;
}

.button:hover:before {
  @apply w-full;
}

</style>
