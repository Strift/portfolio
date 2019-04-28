<template>
  <div class="container mx-auto mt-10 md:mt-16">
    <div class="flex flex-wrap">
      <div v-for="article in articles" class="w-full md:w-1/2 lg:w-1/3 flex-none px-6 mb-10 md:mb-16">
        <div class="card block shadow hover:shadow-lg ">
          <a v-if="article.external" class="text-black no-underline" :href="article.path" target="_blank">
            <ArticleCard
              :title="article.title"
              :thumbnail-url="article.thumbnail"
              :date="article.date"
              lang="fr"
            />
          </a>
          <router-link v-else :to="article.path" class="text-black no-underline">
            <ArticleCard
              :title="article.title"
              :thumbnail-url="article.frontmatter.thumbnail"
              :date="article.frontmatter.date"
            />
          </router-link>
        </div>
      </div>
    </div>
    <SocialsFooter class="mt-10"/>
  </div>
</template>

<script>
import moment from 'moment'
import ogArticles from '../../ogamingArticles.json'

import ArticleCard from '../components/ArticleCard'
import SocialsFooter from '../components/SocialsFooter'

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
  computed: {
    articles () {
      return this.$site.pages
        .filter(page => page.path !== '/articles/' && page.path.startsWith('/articles/'))
        .concat(ogArticles.map(a => {
          return {
            path: a.url,
            thumbnail: `/images/articles/og-thumbnails/${a.image}`,
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
