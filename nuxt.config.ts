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
    cssPath: '~/assets/css/base.css',
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
})
