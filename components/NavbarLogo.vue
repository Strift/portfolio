<template>
  <div ref="wrapper">
    <router-link v-show="showLogo" to="/">
      <nuxt-img src="/images/me.jpg" class="w-10 h-10" />
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'NavbarLogo',
  props: {
    showLogo: {
      type: Boolean,
      required: true
    }
  },
  mounted () {
    this.$store.commit('setNavbarLogo', this.$refs.wrapper)
  }
}
</script>
