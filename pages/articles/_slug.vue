<template>
  <div class="article-page mx-5 lg:mx-0">
    <nuxt-content :document="article" class="space-y-6"/>
  </div>
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    const article = await $content('articles', params.slug).fetch()

    return { article }
  }
}
</script>

<style lang="scss">
.article-page {

  @apply pb-12 max-w-screen-md mx-auto text-black leading-loose font-serif text-left space-y-6;

  h1, h2, p, .comment, ul {
    @apply mx-auto;
  }

  ul {
    @apply pl-4;
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

  figure {
    @apply flex flex-col mb-8;

    img, iframe {
      @apply mx-auto;
    }

    figcaption {
      @apply mx-auto mt-5 font-sans text-gray-700;

      a {
        @apply text-gray-700;
      }
    }
  }

  .comment {
    @apply italic border-l-4;

    p {
      @apply ml-6;
    }
  }

  .legend {
    p {
      @apply mt-5 font-sans text-gray-700;
    }
  }

  a {
    @apply text-black;
  }
}

</style>