<template>
  <header :class="`${positionClass} pin-t z-10 w-full p-6`">
    <nav class="flex">
      <NavbarLogo :show-logo="isLogoVisible" />
      <ul class="h-10 flex items-center list-reset uppercase font-sans tracking-wide font-semibold ml-auto text-black">
        <li class="inline px-10">
          <router-link to="/articles/" class="">Articles</router-link>
        </li>
        <li class="inline px-10">
          <a href="mailto:lau.cazanove@gmail.com" class="">Contact</a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import NavbarLogo from './NavbarLogo'

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

<style lang="scss" scoped>
a {
  @apply .relative .no-underline .text-black;
}

a:before {
  content: "";
  @apply .absolute .w-full .h-1 .pin-l .bg-white .invisible;
  bottom: -5px;
  transform: scaleX(0);
  transition: all 0.3s ease-in-out 0s;
}

a:hover:before {
  @apply .visible;
  transform: scaleX(1);
}
</style>
