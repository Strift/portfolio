<template>
  <div class="flex justify-center space-x-8 text-gray-400">
    <a href="https://twitter.com/lau_cazanove" target="_blank" rel="noopener" title="Twitter" class="hover:text-indigo-400">
      <TwitterIcon />
    </a>
    <a href="https://github.com/Strift" target="_blank" rel="noopener" title="GitHub" class="hover:text-indigo-400">
      <GithubIcon />
    </a>
    <a href="https://linkedin.com/in/laurentcazanove" target="_blank" rel="noopener" title="LinkedIn" class="hover:text-indigo-400">
      <LinkedInIcon />
    </a>
  </div>
</template>

<script>
import GithubIcon from '~/components/icons/GithubIcon.vue'
import TwitterIcon from '~/components/icons/TwitterIcon.vue'
import LinkedInIcon from '~/components/icons/LinkedInIcon.vue'

export default {
  components: {
    GithubIcon,
    TwitterIcon,
    LinkedInIcon
  }
}
</script>
