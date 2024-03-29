<template>
  <div class="relative bg-gray-100">
    <Banner
      class="sticky top-0 z-50"
      :visible="isBannerVisible"
      :style="`margin-bottom: -${headerNegativeMargin}px`"
      @close="isBannerVisible = false"
    />
    <div class="absolute top-0 left-0 right-0 z-10 pt-8 mx-6 lg:mx-24">
      <Navbar link-class="text-white shadow-thin" />
    </div>

    <div class="relative h-screen">
      <BaseImage :alt="article.coverAlt" :src="article.cover" class="w-full h-full" />
      <div class="absolute inset-0 from-black to-transparent bg-gradient-to-t">
        <!-- Overlay -->
      </div>
    </div>
    <div class="border-t-8 border-indigo-400" />
    <div class="relative -mt-40 sm:-mt-32">
      <div class="relative max-w-sm mx-auto bg-white shadow-lg sm:max-w-screen-lg">
        <ArticleHeader
          :title="article.title"
          :description="article.description"
          :tags="article.tags"
          :published="publishText"
          class="absolute w-full px-6 pb-12 transform -translate-y-full sm:px-24 xl:px-0"
        />
        <nuxt-content
          :document="article"
          class="px-6 py-12 font-serif text-xl leading-loose text-left text-gray-700 sm:px-24 article-page"
        />
      </div>
    </div>
    <template v-if="false">
      <div class="container mx-auto text-xl italic leading-9 text-center text-gray-400">
        <p class="mt-16 mb-8">
          <em class="font-semibold text-indigo-400">Esports Tech News</em> is a tech-focused newsletter for developers,
          designers, and product managers working in esports.<br>
        </p>
        <p class="text-gray-400">
          Delivered every two weeks. ✨
        </p>
      </div>
      <RevueEmbed class="mt-16" />
    </template>
    <!-- <ArticleList :articles="featuredArticles" /> -->
    <div class="max-w-screen-sm mx-auto mt-16 text-xl text-center">
      <nuxt-link to="/articles/" class="text-indigo-600">
        ← back to articles
      </nuxt-link>
    </div>
    <div class="mt-16 mb-8 font-sans text-xl italic leading-9 text-center text-gray-400">
      Get in touch
    </div>
    <SocialsLinks class="pb-16" />
  </div>
</template>

<script>
import parseDate from '../../data/parsers/parseDate'
import BaseImage from '~/components/Base/Image.vue'
import Banner from '~/components/Banner.vue'
import Navbar from '~/components/Navbar.vue'
import RevueEmbed from '~/components/RevueEmbed.vue'
import SocialsLinks from '~/components/SocialsLinks.vue'
import ArticleHeader from '~/components/Blog/ArticleHeader.vue'
import ArticleList from '~/components/organisms/ArticleList.vue'

const BANNER_HEIGHT = 40
// const NAVBAR_HEIGHT = 160

export default {
  components: {
    BaseImage,
    Banner,
    Navbar,
    RevueEmbed,
    SocialsLinks,
    ArticleHeader,
    ArticleList
  },
  layout: 'article',
  async asyncData ({ $content, params, error }) {
    try {
      const article = await $content('articles', params.slug).fetch()
      return {
        article
      }
    } catch (err) {
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  data: () => ({
    isBannerVisible: false
  }),
  head () {
    const link = this.article.canonicalUrl
      ? [{ rel: 'canonical', href: this.article.canonicalUrl }]
      : []

    return {
      title: `${this.article.title} | Laurent Cazanove`,
      meta: [
        { name: 'author', content: 'Laurent Cazanove' },
        { name: 'description', content: this.article.description, hid: 'description' },
        { property: 'og:title', content: this.article.title },
        { property: 'og:description', content: this.article.description },
        { property: 'og:image', content: `${this.$config.baseURL}${this.article.cover}` },
        { property: 'og:url', content: `${this.$config.baseURL}${this.$route.path}` },
        { property: 'og:site_name', content: 'Laurent Cazanove' },
        { name: 'twitter:image:alt', content: this.article.coverAlt },
        { name: 'twitter:card', content: 'summary_large_image' }
      ],
      link
    }
  },
  computed: {
    backgroundStyles () {
      const imgUrl = this.$img(this.article.cover)
      return {
        backgroundImage: `url('${imgUrl}')`
      }
    },
    headerNegativeMargin () {
      return (this.isBannerVisible ? BANNER_HEIGHT : 0)
    },
    publishText () {
      return (this.article.edited
        ? 'Edited '
        : ''
      ) + parseDate(this.article.date)
    }
  },
  methods: {
  }
}
</script>

<style src="~/assets/css/article.scss" lang="scss"/>
