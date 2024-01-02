<template>
  <HomeTemplate :content="page" />
</template>

<script>
import HomeTemplate from '~/components/templates/HomeTemplate.vue'

export default {
  name: 'Home',
  components: {
    HomeTemplate
  },
  async asyncData ({ $content }) {
    const page = await $content('home').fetch()
    return {
      page
    }
  },
  data () {
    return {}
  }
}
</script>
