/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cukup definisikan warna custom saja
        primary: {
          dark: '#044682',
          light: '#4196CF',
          yellow: '#ECBD00',
        },
      },
      fontFamily: {
        ace: ['"Ace Sans"', 'sans-serif'],
        brigade: ['"Fundamental Brigade"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}