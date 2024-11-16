import { readdirSync } from 'fs'
import { join } from 'path'
import { ICONS } from './constants'

function isRunningOnVercelPreview() {
  return process.env.VERCEL_ENV === 'preview'
}

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxt/content',
    '@nuxt/image',
    '@nuxt/eslint',
    '@nuxtjs/tailwindcss',
    '@nuxt/fonts',
    '@nuxt/scripts',
    '@nuxt/icon',
    'nuxt-og-image',
    '@twicpics/components/nuxt3',
    'floating-vue/nuxt',
  ],
  compatibilityDate: '2024-07-05',
  runtimeConfig: {
    public: {
      posthogPublicKey: 'phc_JbZN3sJGZfJaNZNDFv27SjkCtaKi0ehWAYDrNy0IbHu',
      posthogHost: 'https://eu.i.posthog.com',
    },
  },
  eslint: {
    config: {
      stylistic: {
        indent: 2,
        semi: false,
      },
    },
  },
  fonts: {
    families: [
      { name: 'Noto Sans', weights: ['400', '700'], styles: ['normal', 'italic'] },
      { name: 'Poppins', weights: ['600', '800'] },
    ],
  },
  tailwindcss: {
    cssPath: ['~/assets/css/base.css', { injectPosition: 'first' }],
  },
  content: {
    highlight: {
      theme: 'one-light',
    },
  },
  scripts: {
    globals: process.env.NODE_ENV === 'production' && !isRunningOnVercelPreview()
      ? {
          myScript: {
            'src': 'https://cloud.umami.is/script.js',
            'defer': true,
            'data-website-id': process.env.UMAMI_WEBSITE_ID,
          },
        }
      : {},
  },
  app: {
    head: {
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'format-detection', content: 'telephone=no' },
      ],
    },
  },
  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL,
    name: 'Laurent Cazanove',
  },
  ogImage: {
    zeroRuntime: true,
    fonts: [
      'Poppins:800',
      'Noto+Sans:400',
      'Noto+Sans:700',
    ],
  },
  twicpics: {
    domain: process.env.NUXT_PUBLIC_TWICPICS_DOMAIN,
  },
  icon: {
    clientBundle: {
      icons: [
        ICONS.ARROW_BACK,
        ICONS.ARROW_RIGHT,
        ICONS.PENCIL,
      ],
    },
  },
  routeRules: {
    '/articles': { redirect: '/' },
    '/articles/**': { redirect: '/blog/**' },
  },
  nitro: {
    // Pre-render all pages in the content/blog directory
    prerender: {
      routes: (() => {
        const blogDir = join(process.cwd(), 'content', 'blog')
        const files = readdirSync(blogDir)
        return files
          .filter(file => file.endsWith('.md'))
          .map(file => `/blog/${file.replace('.md', '')}`)
      })(),
    },
  },
})