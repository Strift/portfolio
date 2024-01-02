<script>
import PropTypes from '@znck/prop-types'
import GridLayout from '~/components/atoms/GridLayout.vue'
import ArticleCard from '~/components/molecules/ArticleCard.vue'

export default {
  components: {
    GridLayout,
    ArticleCard
  },
  props: {
    limit: PropTypes.number,
    articles: PropTypes.arrayOf(PropTypes.shape({
      path: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      thumbnail: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      external: PropTypes.bool,
      lang: PropTypes.string.isRequired,
      highlight: PropTypes.bool,
      tags: PropTypes.arrayOf(PropTypes.string).isRequired
    })).isRequired
  },
  computed: {
    articlesToDisplay () {
      return this.limit ? this.articles.slice(0, this.limit) : this.articles
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

<template>
  <GridLayout>
    <div
      v-for="article in articlesToDisplay"
      :key="article.path"
    >
      <a v-if="article.external" class="text-black no-underline" :href="linkToArticle(article)" target="_blank" rel="noopener">
        <ArticleCard
          :title="article.title"
          :description="article.description"
          :thumbnail-url="article.thumbnail"
          :thumbnail-alt="article.title"
          :date="article.date"
          :lang="article.lang"
          :tags="article.tags"
        />
      </a>
      <router-link v-else :to="linkToArticle(article)" class="text-black no-underline">
        <ArticleCard
          :title="article.title"
          :description="article.description"
          :thumbnail-url="article.cover"
          :thumbnail-alt="article.coverAlt"
          :date="article.date"
          :lang="article.lang"
          :tags="article.tags"
        />
      </router-link>
    </div>
  </GridLayout>
</template>
