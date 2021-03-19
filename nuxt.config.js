export default {
  target: 'static',
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