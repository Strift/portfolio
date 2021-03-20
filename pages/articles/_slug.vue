<template>
  <div class="pb-5">
    <div class="article-page">

      <nuxt-content :document="article" class="max-w-screen-md mx-auto text-black leading-loose font-serif text-left space-y-6 text-lg"/>
    </div>
    <SocialsFooter class="mt-10"/>
  </div>
</template>

<script>
import SocialsFooter from '~/components/SocialsFooter.vue'

export default {
  components: {
    SocialsFooter
  },
  async asyncData({ $content, params }) {
    const article = await $content('articles', params.slug).fetch()

    return { article }
  }
}
</script>

<style lang="scss">
.article-page {
  ul {
    @apply list-disc pl-4;
  }

  h1 {
    @apply text-5xl mb-10;

    .header-anchor {
      @apply hidden;
    }
  }

  h2 {
    @apply font-sans text-3xl mb-6 mt-10;

    .header-anchor {
      @apply -ml-7 no-underline opacity-0 font-normal;
    }
  }

  h2:hover {
    .header-anchor {
      @apply opacity-75;
    }
  }

  img {
    @apply mx-auto;
  }

  figure {

    img, iframe {
      @apply mx-auto;
    }

    figcaption {
      @apply mx-auto mt-5 font-sans text-gray-700 text-center text-base;

      a {
        @apply text-gray-700;
      }
    }
  }

  blockquote {
    @apply italic border-l-4;

    p {
      @apply ml-6;
    }
  }

  .article-date {
    @apply text-gray-700 mt-2;
  }

  a {
    @apply underline;
  }
}
</style>