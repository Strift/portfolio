<template>
  <div class="flex flex-grow">
    <HomeContent :page="page" class="my-auto" style="width: 900px" />
    <div class="ml-auto mr-16 my-auto">
      <img
        src="~/assets/images/me.jpg"
        alt="Me"
        class="rounded-sm shadow-lg shadow-thin"
        style="height: 530px; width: 530px"
      >
      <div class="flex justify-center mt-9 space-x-8 text-gray-400">
        <a href="https://twitter.com/lau_cazanove" target="_blank" title="Twitter" class="hover:text-sky-600">
          <TwitterIcon />
        </a>
        <a href="https://github.com/Strift" target="_blank" title="GitHub" class="hover:text-sky-600">
          <GithubIcon />
        </a>
        <a href="https://linkedin.com/in/laurentcazanove" target="_blank" title="LinkedIn" class="hover:text-sky-600">
          <LinkedInIcon />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import HomeContent from '~/components/HomeContent.vue'
import GithubIcon from '~/components/icons/GithubIcon.vue'
import TwitterIcon from '~/components/icons/TwitterIcon.vue'
import LinkedInIcon from '~/components/icons/LinkedInIcon.vue'

export default {
  name: 'Home',
  components: {
    HomeContent,
    GithubIcon,
    TwitterIcon,
    LinkedInIcon
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
