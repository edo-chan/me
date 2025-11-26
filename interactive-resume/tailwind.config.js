/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        'handwriting': ['"Indie Flower"', 'cursive'],
        'system': ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
      backgroundImage: {
        'paper': "url('https://www.transparenttextures.com/patterns/lined-paper-2.png')",
      }
    },
  },
  plugins: [],
}
