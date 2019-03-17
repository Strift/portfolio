const containerPlugin = require('markdown-it-container')
const figuresPlugin = require('markdown-it-implicit-figures')

module.exports = {
  markdown: {
    config: md => {
      md.use(containerPlugin, 'comment'),
      md.use(figuresPlugin, {
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
