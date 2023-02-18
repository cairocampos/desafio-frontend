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
        brand: '#8DD447',
        primary: '#061826',
        secondary: '#192A37',
      },
    },
  },
  plugins: [],
}
