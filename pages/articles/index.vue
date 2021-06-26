<template>
  <div class="container mx-auto">
    <div class="gap-10 grid grid-cols-1 lg:gap-16 lg:grid-cols-3 sm:grid-cols-2">
      <div
        v-for="article in articles"
        :key="article.path"
      >
        <a v-if="article.external" class="no-underline text-black" :href="linkToArticle(article)" target="_blank">
          <ArticleCard
            :title="article.title"
            :description="article.description"
            :thumbnail-url="article.thumbnail"
            :date="article.date"
            :lang="article.lang"
            :tags="article.tags"
            class="card"
          />
        </a>
        <router-link v-else :to="linkToArticle(article)" class="no-underline text-black">
          <ArticleCard
            :title="article.title"
            :description="article.description"
            :thumbnail-url="article.thumbnail"
            :date="article.date"
            :lang="article.lang"
            :tags="article.tags"
            class="card"
          />
        </router-link>
      </div>
    </div>
    <SocialsFooter class="mt-10" />
  </div>
</template>

<script>
import moment from 'moment'
import ogArticles from '~/data/ogamingArticles.json'
import mediumArticles from '~/data/mediumArticles.json'

import ArticleCard from '~/components/ArticleCard.vue'
import SocialsFooter from '~/components/SocialsFooter.vue'

const sortByDate = (articleA, articleB) => {
  const dateA = moment(articleA.date || articleA.frontmatter.date, 'YYYY-MM-DD')
  const dateB = moment(articleB.date || articleB.frontmatter.date, 'YYYY-MM-DD')
  return dateB.diff(dateA)
}

export default {
  components: {
    ArticleCard,
    SocialsFooter
  },
  async asyncData ({ $content }) {
    const markdownArticles = await $content('articles').fetch()
    return {
      markdownArticles
    }
  },
  head () {
    return {
      title: 'Articles | Laurent Cazanove'
    }
  },
  computed: {
    articles () {
      return this.markdownArticles
        .concat(ogArticles.map((a) => {
          return {
            path: a.url,
            thumbnail: `/images/articles/og-thumbnails/${a.image}`,
            title: a.title,
            date: a.date,
            external: true,
            lang: 'fr',
            highlight: a.highlight,
            tags: ['esports']
          }
        }))
        .concat(mediumArticles.map((a) => {
          return {
            path: a.url,
            thumbnail: `/images/articles/medium-thumbnails/${a.image}`,
            title: a.title,
            description: a.description,
            date: a.date,
            external: true,
            highlight: a.highlight,
            tags: a.tags
          }
        }))
        .sort(sortByDate)
    },
    highlights () {
      return this.articles.filter(article => article.highlight || (article.frontmatter && article.frontmatter.highlight))
    }
  },
  methods: {
    linkToArticle (article) {
      if (!article.external && !article.path.endsWith('/')) {
        return `${article.path}/`
      }
      return article.path
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  transition: 250ms;

  &:hover {
    transform: translate3d(0px, -6px, 0);
  }
}
</style>
