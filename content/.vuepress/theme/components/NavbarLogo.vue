<template>
  <div ref="wrapper">
    <router-link v-if="logoVisible" to="/">
      <img :src="$page.frontmatter.heroImage" class="h-10 w-10">
    </router-link>
  </div>
</template>

<script>
export default {
  data () {
    return {
      logoVisible: false
    }
  },
  watch: {
    $route (to, from) {
      this.updateLogoVisibility()
    }
  },
  mounted () {
    this.updateLogoVisibility()
    // this.$store.commit('setNavbarLogo', this.$refs.wrapper)
  },
  methods: {
    updateLogoVisibility () {
      this.logoVisible = (this.$route.path !== '/')
    }
  }
}
</script>
