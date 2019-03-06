module.exports = {
  markdown: {
    config: md => {
      md.use(require('markdown-it-container'), 'comment')
    }
  },
  postcss: {
    plugins: [
      require('tailwindcss')('./tailwind.js'),
      require('autoprefixer')
    ]
  }
}
