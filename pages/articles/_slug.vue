<template>
  <div class="pb-5">
    <div class="article-page mt-10">

      <nuxt-content 
        :document="article" 
        class="max-w-screen-md mx-auto leading-loose font-serif text-left space-y-6 text-lg text-gray-900"
      />
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
  async asyncData({ $content, params, error }) {
    try {
      const article = await $content('articles', params.slug).fetch()
      return { article }
    } catch (err) {
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  head () {
    return {
      title: `${this.article.title} | Laurent Cazanove`,
      meta: [
      { name: 'author', content: 'Laurent Cazanove' },
      { name: 'description', content: this.article.description, hid: 'description' },
      { property: 'og:title', content: this.article.title },
      { property: 'og:description', content: this.article.description },
      { property: 'og:image', content: `${this.$config.baseURL}${this.article.thumbnail}` },
      { property: 'og:url', content: `${this.$config.baseURL}${this.$route.path}` },
      { property: 'og:site_name', content: 'Laurent Cazanove' },
      { name: 'twitter:image:alt', content: this.article.thumbnailAlt },
      { name: 'twitter:card', content: 'summary_large_image' }
      ]
    }
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