<template>
  <div class="flex flex-col lg:mx-24 min-h-screen mx-6 pb-16">
    <Navbar />
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
