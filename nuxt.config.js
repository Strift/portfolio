export default {
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'static',
  trailingSlash: true,
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
      { hid: 'description', name: 'description', content: 'Freelance engineer, teacher, and writer specialized in esports' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Components
  */
  components: [
    '~/components/global'
  ],
  /*
  ** Global CSS
  */
  css: [
    'animate.css',
    '~/assets/css/base.css'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/tailwindcss'
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
  }
}