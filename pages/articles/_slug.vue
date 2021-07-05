<template>
  <div class="pb-5">
    <div class="article-page mt-10">
      <nuxt-content
        :document="article"
        class="font-serif leading-loose max-w-screen-md mx-auto space-y-8 text-gray-700 text-left text-xl"
      />
    </div>
    <SocialsLinks class="mt-16" />
  </div>
</template>

<script>
import SocialsLinks from '~/components/SocialsLinks.vue'

export default {
  components: {
    SocialsLinks
  },
  async asyncData ({ $content, params, error }) {
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
    @apply font-serif font-semibold text-5xl mb-10 ;
  }

  h2 {
    @apply font-sans text-3xl mb-6 mt-10 font-semibold text-indigo-500;
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

  code {
    @apply text-base;
  }

  p {
    code {
      @apply bg-indigo-200 bg-opacity-25 p-1 rounded text-indigo-500 border border-opacity-25 font-normal;
    }
  }
}
</style>
