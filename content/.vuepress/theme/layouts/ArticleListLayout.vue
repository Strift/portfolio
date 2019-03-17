<template>
  <div class="container mx-auto mt-10 md:mt-16">
    <div class="flex flex-wrap">
      <div v-for="article in articles" class="w-full md:w-1/2 lg:w-1/3 flex-none px-6 mb-10 md:mb-16">
        <router-link :to="article.path" class="card block shadow hover:shadow-lg text-black no-underline">
          <div class="h-48 bg-cover bg-center" :style="`background-image: url('${article.frontmatter.thumbnail}')`">
          </div>
          <div class="bg-white p-5 font-serif">
            <div class="font-semibold leading-tight mb-3">
              {{ article.title }}
            </div>
            <div class="text-grey text-sm font-sans">
              {{ article.frontmatter.date | humanReadable }}
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

const sortByDate = (articleA, articleB) => {
  const dateA = moment(articleA.frontmatter.date, 'YYYY-MM-DD')
  const dateB = moment(articleB.frontmatter.date, 'YYYY-MM-DD')
  return dateB.diff(dateA)
}

export default {
  computed: {
    articles () {
      return this.$site.pages
        .filter(page => page.path !== '/articles/' && page.path.startsWith('/articles/'))
        .sort(sortByDate)
    }
  },
  filters: {
    humanReadable (date) {
      return moment(date).format('LL')
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
