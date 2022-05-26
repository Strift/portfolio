<template>
  <div class="lg:flex lg:flex-grow">
    <BaseImage
      src="/images/me.jpg"
      alt="Picture of me"
      width="256"
      height="256"
      class="mx-auto mb-16 overflow-hidden rounded-full shadow-lg lg:hidden aspect-square"
    />
    <div class="lg:mr-16">
      <h2 class="mb-12 lg:mb-20">
        <div class="mb-2 text-5xl font-semibold tracking-tight text-gray-700 lg:text-7xl">
          I'm Laurent,
        </div>
        <div class="text-4xl font-semibold tracking-tight text-indigo-400 lg:text-5xl">
          Engineer & Writer
        </div>
      </h2>
      <HomeContent :page="page" class="my-auto font-sans text-gray-500 lg:max-w-screen-md" />
      <!-- <HomeContent :page="page" class="my-auto" style="width: 900px" /> -->
      <div class="flex justify-center mt-16">
        <ContactButton>
          Send an email
        </ContactButton>
      </div>
    </div>
    <div class="flex-shrink-0 lg:m-auto">
      <BaseImage
        src="/images/me.jpg"
        alt="Picture of me"
        width="384"
        height="384"
        class="hidden rounded-sm shadow-lg lg:block shadow-thin aspect-square"
      />
      <!-- <div class="mt-16 mb-8 font-sans text-xl text-center text-gray-500">
        Get in contact
      </div> -->
      <SocialsLinks class="mt-16" />
    </div>
  </div>
</template>

<script>
import BaseImage from '~/components/Base/Image.vue'
import HomeContent from '~/components/HomeContent.vue'
import ContactButton from '~/components/ContactButton.vue'
import SocialsLinks from '~/components/SocialsLinks.vue'

export default {
  name: 'Home',
  components: {
    BaseImage,
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
