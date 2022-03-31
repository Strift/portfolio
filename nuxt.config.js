export default {
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'static',
  router: {
    trailingSlash: true
  },
  /*
  ** Runtime config
  */
  publicRuntimeConfig: {
    baseURL: process.env.NODE_ENV === 'production' ? 'https://laurentcazanove.com' : 'localhost:3000'
  },
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    htmlAttrs: {
      lang: 'fr'
    },
    title: 'Laurent Cazanove',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'description', content: 'Freelance software engineer specialized in esports.', hid: 'description' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Components
  */
  components: [
    // Register components to be used in `/content/articles/*.md`
    '~/components/Markdown'
  ],
  /*
  ** Global CSS
  */
  css: [
    'animate.css',
    '~/assets/css/base.css',
    '~/assets/css/fonts.css'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxt/image',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/eslint-module',
    '@nuxtjs/google-analytics',
    '@nuxtjs/composition-api/module'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxt/content'
  ],
  /*
  ** Content
  */
  content: {
    liveEdit: false
  },
  /*
  ** Google Analytics
  */
  googleAnalytics: {
    id: 'UA-99085502-2'
  }
  /*
  ** Image
  */
  // image: {
  //   provider: 'twicpics',
  //   twicpics: {
  //     baseURL: 'https://vy8wjkde.twic.pics'
  //   }
  // }
}
