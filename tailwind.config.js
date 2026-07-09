/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        saffron: '#FF6B00',
        maroon: '#800000',
        gold: '#D4AF37',
        cream: '#FFF8F0',
        charcoal: '#333333'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        devanagari: ['Noto Sans Devanagari', 'sans-serif']
      }
    },
  },
  plugins: [],
}
