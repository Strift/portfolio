<template>
  <div class="h-min-screen">
    <Banner
      v-if="$config.enableBanner"
      :visible="isBannerVisible"
      class="sticky top-0 z-50"
      @close="isBannerVisible = false"
    />
    <div class="flex flex-col h-full pb-16 mx-6 lg:mx-24">
      <Navbar class="mb-16" />
      <Nuxt />
    </div>
  </div>
</template>

<script>
import Navbar from '~/components/Navbar.vue'
import Banner from '~/components/Banner.vue'

export default {
  name: 'DefaultLayout',
  components: {
    Navbar,
    Banner
  },
  data: () => ({
    isBannerVisible: true
  })
}
</script>
