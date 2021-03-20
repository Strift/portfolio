<template>
  <header :class="`${positionClass} pin-t z-10 w-full py-6`">
    <nav class="flex uppercase font-sans tracking-wide font-semibold text-black">
      <NavbarLogo :show-logo="isLogoVisible" />
      <ul class="h-10 flex items-center list-reset ml-auto space-x-20">
        <li>
          <router-link to="/articles/" class="">Articles</router-link>
        </li>
        <li>
          <a href="mailto:laucazanove@gmail.com" class="">Contact</a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import NavbarLogo from '~/components/NavbarLogo.vue'

export default {
  components: {
    NavbarLogo
  },
  data () {
    return {
      currentPath: this.$router.currentRoute.path
    }
  },
  watch: {
    $route (to, from) {
      this.currentPath = to.path
    }
  },
  computed: {
    positionClass () {
      return this.currentPath === '/' ? 'absolute' : 'sticky'
    },
    isLogoVisible () {
      return this.currentPath !== '/'
    }
  }
}
</script>

<style scoped>
a {
  @apply relative no-underline text-black;
}

.router-link-active:before {
  content: "";
  @apply absolute w-full h-1 left-0 bg-black visible;
  transform: scaleX(1);
  bottom: -5px;
}

a:before {
  content: "";
  @apply absolute w-full h-1 left-0 bg-white invisible;
  bottom: -5px;
  transform: scaleX(0);
  transition: all 150ms ease-in-out 0s;
}

a:hover:before {
  @apply visible;
  transform: scaleX(1);
}
</style>
