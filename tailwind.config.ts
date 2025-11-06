import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eefcf6',
          100: '#d6f7e8',
          200: '#aeeed0',
          300: '#7de2b6',
          400: '#4fd89f',
          500: '#27c786',
          600: '#1aa56f',
          700: '#15825a',
          800: '#12684b',
          900: '#0f563f'
        }
      },
      borderRadius: {
        xl: '1rem'
      }
    }
  },
  plugins: []
} satisfies Config
