const containerPlugin = require('markdown-it-container')
const figuresPlugin = require('markdown-it-implicit-figures')

module.exports = {
  markdown: {
    config: md => {
      md.use(containerPlugin, 'comment'),
      md.use(containerPlugin, 'legend', {
        render: function (tokens, idx) {
          console.log(tokens, idx)
          // const m = tokens[idx].info.trim().match(/^spoiler\s+(.*)$/);
          // console.log(m)

          // if (tokens[idx].nesting === 1) {
          //   // opening tag
          //   return '<details><summary>' + md.utils.escapeHtml(m[1]) + '</summary>\n';

          // } else {
          //   // closing tag
          //   return '</details>\n';
          // }
        }
      }),
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
