<template>
  <div class="bg-black">
    <div class="h-screen bg-center bg-cover" style="background-image: url('/images/articles/covers/sunwell.jpg');">
      <!-- <nuxt-img
        src="/images/articles/covers/sunwell.jpg"
        class="z-0 min-w-screen"
      /> -->
    </div>
    <div class="-mt-24">
      <div class="relative max-w-screen-md mx-auto bg-white">
        <ArticleHeader
          :title="article.title"
          :description="article.description"
          published="Mis à jour le 19 Août, 2021"
          class="absolute w-full px-6 pb-12 transform -translate-y-full"
        />
        <nuxt-content
          :document="article"
          class="px-6 py-12 font-serif text-xl leading-loose text-left text-gray-700"
        />
      </div>
    </div>
  </div>
  <!-- <div class="pb-5">
    <div class="mt-10 article-page">
      <nuxt-content
        :document="article"
        class="max-w-screen-md mx-auto font-serif text-xl leading-loose text-left text-gray-700"
      />
    </div>
    <template v-if="true">
      <div class="container mx-auto text-center">
        <div class="my-12 text-4xl tracking-widest text-center text-gray-200 eading-none">
          &bull; &bull; &bull;
        </div>
        <p class="text-xl italic leading-9 text-gray-400">
          I also write <em class="font-semibold">Esports Tech News</em>—a newsletter that comes out every two weeks.<br>
          Subscribe if you like code, esports, and the creative things in between.
        </p>
      </div>
      <RevueEmbed class="mt-16" />
    </template>
    <SocialsLinks class="mt-16" />
  </div> -->
</template>

<script>
import RevueEmbed from '~/components/RevueEmbed.vue'
import SocialsLinks from '~/components/SocialsLinks.vue'
import ArticleHeader from '~/components/Blog/ArticleHeader.vue'

export default {
  components: {
    RevueEmbed,
    SocialsLinks,
    ArticleHeader
  },
  layout: 'article',
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
    @apply font-serif font-semibold text-5xl mb-10;
  }

  h2 {
    @apply font-sans text-3xl mb-6 mt-10 font-semibold text-indigo-500;
  }

  p {
    @apply mb-8;

    code {
      @apply bg-indigo-200 bg-opacity-25 p-1 rounded text-indigo-500 border border-opacity-25 font-normal;
    }
  }

  img {
    @apply mx-auto;
  }

  figure {
    img,
    iframe {
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
    @apply italic border-l-4 mb-8;

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

  .component {
    @apply mt-10 mb-12;
  }
}
</style>
