/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    extend: {
      fontFamily:{
        sans: ['Roboto', 'sans-serif'],
      },
      colors: {
        dark: '#27272A',
        brand: '#6E37FA',
        primary: '#6E37FA',
        secondary: '#FBFBFB',
      },
    },
  },
  plugins: [],
}
