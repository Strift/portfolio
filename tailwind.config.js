module.exports = {
  purge: [
    './components/**/*.vue',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './content/**/*.md'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'nye-primary': '#171c38',
        'nye-secondary': '#0f57ea',
        'seo-primary': '#aa8a00',
        'seo-secondary': '#000000',
      },
      borderWidth: {
        '16': '16px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
