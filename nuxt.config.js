export default {
  target: 'static',
  trailingSlash: true,
  /*
  ** Content
  */
  content: {
    liveEdit: false
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
    '~/assets/css/base.css'
  ],
  modules: [
    '@nuxt/content'
  ],
  buildModules: [
    '@nuxtjs/tailwindcss'
  ]
}