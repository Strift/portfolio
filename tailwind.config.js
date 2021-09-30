const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  purge: [
    './components/**/*.vue',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './content/**/*.md'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['Fira Sans', ...defaultTheme.fontFamily.sans],
      serif: ['Merriweather', ...defaultTheme.fontFamily.serif]
    },
    extend: {
      colors: {
        sky: colors.sky,
        'nye-primary': '#171c38',
        'nye-secondary': '#0f57ea',
        'seo-primary': '#aa8a00',
        'seo-secondary': '#000000'
      },
      borderWidth: {
        16: '16px'
      },
      zIndex: {
        '-1': '-1',
        '-2': '-2'
      }
    }
  },
  variants: {
    extend: {
      translate: ['group-hover']
    }
  },
  plugins: []
}
