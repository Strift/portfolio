<template>
  <div class="flex flex-col min-h-screen pb-16 mx-6 lg:mx-24">
    <Navbar class="mb-16" />
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
