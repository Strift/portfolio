<template>
  <div class="relative mx-10">
    <Navbar/>
    <Nuxt />
  </div>
</template>

<script>
import Navbar from '~/components/Navbar.vue'

export default {
  name: 'DefaultLayout',
  components: {
    Navbar
  }
}
</script>