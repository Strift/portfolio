<template>
  <Container>
    <ArticleList :articles="articles" />
    <SocialsFooter class="mt-10" />
  </Container>
</template>

<script>
import moment from 'moment'
import ogArticles from '~/data/ogamingArticles.json'
import mediumArticles from '~/data/mediumArticles.json'

import Container from '~/components/Base/Container.vue'
import ArticleList from '~/components/organisms/ArticleList.vue'
import SocialsFooter from '~/components/SocialsFooter.vue'

const sortByDate = (articleA, articleB) => {
  const dateA = moment(articleA.date || articleA.frontmatter.date, 'YYYY-MM-DD')
  const dateB = moment(articleB.date || articleB.frontmatter.date, 'YYYY-MM-DD')
  return dateB.diff(dateA)
}

export default {
  components: {
    Container,
    ArticleList,
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
  }
}
</script>
