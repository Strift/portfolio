<template>
  <div class="max-w-screen-lg mx-auto mt-10 md:mt-16">
    <div class="grid grid-cols-3 gap-x-10 gap-y-12">
        <div 
          v-for="article in articles" 
          :key="article.path"
        >
          <a v-if="article.external" class="text-black no-underline" :href="linkToArticle(article)" target="_blank">
            <ArticleCard
              :title="article.title"
              :thumbnail-url="article.thumbnail"
              :date="article.date"
              :lang="article.lang"
              class="card block shadow hover:shadow-lg"
            />
          </a>
          <router-link v-else :to="linkToArticle(article)" class="text-black no-underline">
            <ArticleCard
              :title="article.title"
              :thumbnail-url="article.thumbnail"
              :date="article.date"
              class="card block shadow hover:shadow-lg"
            />
          </router-link>
        </div>
    </div>
    <SocialsFooter class="mt-10"/>
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
    const pages = await $content('articles').fetch()
    return {
      pages
    }
  },
  computed: {
    articles () {
      return this.pages
        .concat(ogArticles.map(a => {
          return {
            path: a.url,
            thumbnail: `/images/articles/og-thumbnails/${a.image}`,
            title: a.title,
            date: a.date,
            external: true,
            lang: 'fr',
            highlight: a.highlight
          }
        }))
        .concat(mediumArticles.map(a => {
          return {
            path: a.url,
            thumbnail: `/images/articles/medium-thumbnails/${a.image}`,
            title: a.title,
            date: a.date,
            external: true,
            highlight: a.highlight
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
      if (article.external && !article.path.endsWith('/')) {
        return  `${article.path}/`
      }
      return article.path
    }
  },
  head () {
    return {
      title: 'Articles | Laurent Cazanove'
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
