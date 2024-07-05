import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: [],
  theme: {
    extend: {
      fontFamily: {
        title: ['Poppins', ...defaultTheme.fontFamily.sans],
        sans: ['Noto Sans', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
} satisfies Config
