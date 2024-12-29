import { readdirSync } from 'fs'
import { join } from 'path'
import { ICONS } from './constants'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: [
    '@nuxt/content',
    '@nuxt/image',
    '@nuxt/eslint',
    '@nuxtjs/tailwindcss',
    '@nuxt/fonts',
    '@nuxt/icon',
    'nuxt-og-image',
    '@twicpics/components/nuxt3',
    // '@sentry/nuxt/module',
    'floating-vue/nuxt',
    '@pinia/nuxt',
    '@vueuse/nuxt',
  ],
  compatibilityDate: '2024-07-05',
  runtimeConfig: {
    public: {
      posthogPublicKey: 'phc_JbZN3sJGZfJaNZNDFv27SjkCtaKi0ehWAYDrNy0IbHu',
      posthogHost: 'https://eu.i.posthog.com',
      sentry: {
        dsn: 'https://961970e783a29ae28cf4bece55814757@o571625.ingest.us.sentry.io/4508317686038528',
      },
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
  sentry: {
    sourceMapsUploadOptions: {
      org: 'strift',
      project: 'portfolio',
      authToken: process.env.SENTRY_AUTH_TOKEN,
    },
  },
  routeRules: {
    '/articles': { redirect: '/' },
    '/articles/**': { redirect: '/blog/**' },
    '/blog/repository-pattern-in-composables': { redirect: '/blog/repository-pattern-with-vue-composables' },
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
  // Enable client source maps for Sentry, server source maps are enabled by default
  // https://docs.sentry.io/platforms/javascript/guides/nuxt/#add-readable-stack-traces-to-errors
  sourcemap: { client: true },
})
