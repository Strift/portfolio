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
