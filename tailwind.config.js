/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#D32F2F',
        secondary: '#2E7D32',
        accent: '#FFC107',
        background: '#FDFBF7',
      },
      fontFamily: {
        fredoka: ['"Fredoka One"', 'cursive'],
        titan: ['"Titan One"', 'cursive'],
        inter: ['Inter', 'sans-serif'],
        oswald: ['Oswald', 'sans-serif'],
      },
    },
  },
  plugins: [],
}