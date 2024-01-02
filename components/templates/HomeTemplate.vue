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
      <HomeContent :page="content" class="my-auto font-sans text-gray-500 lg:max-w-screen-md" />
      <div class="flex justify-center mt-16">
        <ContactButton :url="contactButtonUrl">
          {{ contactButtonText }}
        </ContactButton>
      </div>
    </div>
    <div class="flex-shrink-0 mt-12 lg:m-auto lg:mt-0">
      <h3 class="mb-8 text-3xl font-semibold tracking-tight text-gray-700">
        🍿 Watch my latest talk
      </h3>
      <YoutubeEmbed url="https://www.youtube.com/embed/edrgsjp0N5U?start=24" class="video" />
      <!-- <BaseImage
        src="/images/me.jpg"
        alt="Picture of me"
        width="384"
        height="384"
        class="hidden rounded-sm shadow-lg lg:block shadow-thin aspect-square"
      /> -->
      <SocialsLinks class="mt-16" />
    </div>
  </div>
</template>

<script>
import PropTypes from '@znck/prop-types'
import BaseImage from '~/components/Base/Image.vue'
import HomeContent from '~/components/HomeContent.vue'
import ContactButton from '~/components/atoms/ContactButton.vue'
import SocialsLinks from '~/components/SocialsLinks.vue'
import YoutubeEmbed from '~/components/atoms/YoutubeEmbed.vue'

export default {
  components: {
    BaseImage,
    HomeContent,
    ContactButton,
    SocialsLinks,
    YoutubeEmbed
  },
  props: {
    content: PropTypes.object.isRequired
  },
  computed: {
    contactButtonText () {
      return this.content.actionText || 'Get in touch →'
    },
    contactButtonUrl () {
      return this.content.actionUrl || 'mailto:lau.cazanove@gmail.com'
    }
  }
}
</script>

<style scoped>
@media (min-width: 1024px) {
  .video {
    width: 560px;
  }
}
</style>
