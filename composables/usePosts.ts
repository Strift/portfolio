import type { ArticleNav, ExternalArticleNavContent, MarkdownArticleNav, MediumArticleNav, OgamingArticleNav } from '~/types'

export const useArticles = async () => {
  const { data: allContent, status } = await useAsyncData('articles', () => {
    return Promise.all([
      queryContent<MarkdownArticleNav>('articles').only(['title', 'description', 'cover', 'coverAlt', '_path', 'date']).find(),
      queryContent<ExternalArticleNavContent<MediumArticleNav>>('medium-articles').findOne(),
      queryContent<ExternalArticleNavContent<OgamingArticleNav>>('ogaming-articles').findOne(),
    ])
  })

  const navItems = computed(() => {
    if (!(status.value === 'success' && allContent.value)) {
      return []
    }

    return allContent.value
      .reduce<ArticleNav[]>((nav, content) => {
        if (Array.isArray(content)) {
          return nav.concat(content)
        }
        return nav.concat(content.articles)
      }, [])
      .sort((a, b) => compareFromString(a.date, b.date))
  })

  return {
    navItems,
  }
}
