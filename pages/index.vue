<template>
  <div class="lg:flex lg:flex-grow">
    <img
      src="~/assets/images/me.jpg"
      alt="Me"
      class="h-64 lg:hidden mb-16 mx-auto rounded-full shadow-lg"
    >
    <div class="mr-16">
      <h2 class="lg:mb-20 mb-12">
        <div class="font-semibold lg:text-7xl mb-2 text-5xl text-gray-700 tracking-tight">
          I'm Laurent,
        </div>
        <div class="font-semibold lg:text-5xl text-4xl text-gray-400 tracking-tight">
          Software engineer specialized in esports.
        </div>
      </h2>
      <HomeContent :page="page" class="font-sans lg:max-w-screen-md my-auto text-gray-400" />
      <!-- <HomeContent :page="page" class="my-auto" style="width: 900px" /> -->
      <div class="flex justify-center mt-16">
        <ContactButton>
          Send an email
        </ContactButton>
      </div>
    </div>
    <div class="flex-shrink-0 lg:m-auto">
      <img
        src="~/assets/images/me.jpg"
        alt="Me"
        class="h-96 hidden lg:block rounded-sm shadow-lg shadow-thin w-96"
      >
      <div class="font-sans mb-8 mt-16 text-center text-gray-400 text-xl">
        Let's get in touch
      </div>
      <SocialsLinks />
    </div>
  </div>
</template>

<script>
import HomeContent from '~/components/HomeContent.vue'
import ContactButton from '~/components/ContactButton.vue'
import SocialsLinks from '~/components/SocialsLinks.vue'

export default {
  name: 'Home',
  components: {
    HomeContent,
    ContactButton,
    SocialsLinks
  },
  async asyncData ({ $content }) {
    const page = await $content('home').fetch()
    return {
      page
    }
  },
  data () {
    return {
    }
  }
}
</script>
