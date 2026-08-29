/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          950: '#1a0a2e',
          900: '#16023a',
          800: '#2d1b69',
          700: '#4c2d94',
          600: '#6b3fa0',
          500: '#8b5cf6',
          400: '#a78bfa',
          300: '#c4b5fd',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
