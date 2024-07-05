import type { ParsedContent } from "@nuxt/content"

export type HomePageContent = ParsedContent & {
  actionText: string
  actionUrl: string
}

export type ProjectsPageContent = ParsedContent & {
  body: Array<{
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
}

export type ExternalArticleNavContent<T> = ParsedContent & {
  body: Array<T>
}
export interface OgamingArticleNav {
  title: string
  url: string
  image: string
  date: string
}

export interface MediumArticleNav {
  title: string
  url: string
  image: string
  description: string
  date: string
}
