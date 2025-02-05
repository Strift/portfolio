import type { ParsedContent } from '@nuxt/content'
import type { ICONS } from '~/constants'

export type HomePageContent = ParsedContent & {
  actions: Array<{
    text: string
    href: string
    icon: keyof typeof ICONS
  }>
}

export type ProjectsPageContent = ParsedContent & {
  projects: Array<{
    name: string
    description: string
    image_url: string
    website_url?: string
    github_url?: string
  }>
}

export interface MarkdownArticleNav {
  title: string
  description: string
  cover: string
  coverAlt: string
  _path: string
  date: string
  updatedAt?: string
  tags?: Array<string>
}

export type ExternalArticleNavContent<T> = ParsedContent & {
  articles: Array<T>
}
export interface OgamingArticleNav {
  title: string
  url: string
  image: string
  date: string
  tags: Array<string>
}

export interface MediumArticleNav {
  title: string
  url: string
  image: string
  description: string
  date: string
}

export type ArticleNav = MarkdownArticleNav | OgamingArticleNav | MediumArticleNav

export type BlogPostContent = ParsedContent & {
  title: string
  description: string
  date: string
  updatedAt?: string
  cover: string
  coverAlt: string
  ad?: {
    text: string
    buttonText: string
    buttonLink: string
  }
  showKitForm?: boolean
  components?: Array<string>
}

export type MandarinTip = ParsedContent & {
  title: string
}
