const containerPlugin = require('markdown-it-container')
const figuresPlugin = require('markdown-it-implicit-figures')

module.exports = {
  title: 'Laurent Cazanove',
  description: 'Freelance in esports and web development - Paris',
  base: '/',
  head: [ ['script', {}, `
    !function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);
    },s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='//static.ads-twitter.com/uwt.js',
    a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script');
    // Insert Twitter Pixel ID and Standard Event data below
    twq('init','nzfbg');
    twq('track','PageView');
  `]],
  ga: 'UA-99085502-2',
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
