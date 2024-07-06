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
  ],
  compatibilityDate: '2024-07-05',
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
      { name: 'Noto Sans', weights: ['400', '700'] },
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
    globals: process.env.NODE_ENV === 'production'
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
      title: 'Laurent Cazanove',
      titleTemplate: '%s - Laurent Cazanove',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'Laurent Cazanove' },
        { name: 'format-detection', content: 'telephone=no' },
      ],
    },
  },
  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL,
  },
  ogImage: {
    defaults: {
      renderer: 'chromium',
    },
    fonts: [
      'Poppins:800',
      'Noto+Sans:400',
      'Noto+Sans:700',
    ],
  },
  routeRules: {
    '/articles': { redirect: '/' },
    '/articles/**': { redirect: '/blog/**' },
  },
})
