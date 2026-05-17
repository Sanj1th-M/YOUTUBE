/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        youtube: {
          red: '#FF0000',
          black: '#0F0F0F',
          zinc: {
            700: '#3F3F3F',
            800: '#272727',
            900: '#121212',
          }
        }
      }
    },
  },
  plugins: [],
}
