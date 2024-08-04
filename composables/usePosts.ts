import type { ExternalArticleNavContent, MarkdownArticleNav, MediumArticleNav, OgamingArticleNav } from '~/types'

export const usePosts = () => {
  return useAsyncData('blog-posts', () => {
    return Promise.all([
      queryContent<MarkdownArticleNav>('blog').only(['title', 'description', 'cover', 'coverAlt', '_path', 'date']).find(),
      queryContent<ExternalArticleNavContent<MediumArticleNav>>('medium-articles').findOne(),
      queryContent<ExternalArticleNavContent<OgamingArticleNav>>('ogaming-articles').findOne(),
    ])
  })
}
