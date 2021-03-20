<template>
  <div ref="wrapper">
    <router-link v-show="showLogo" to="/">
      <img src="~/assets/images/me.jpg" class="h-10 w-10">
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
