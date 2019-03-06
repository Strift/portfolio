module.exports = {
  markdown: {
    config: md => {
      md.use(require('markdown-it-container'), 'comment'),
      md.use(require('markdown-it-implicit-figures'), {
        figcaption: true
      })
    }
  },
  postcss: {
    plugins: [
      require('tailwindcss')('./tailwind.js'),
      require('autoprefixer')
    ]
  }
}
