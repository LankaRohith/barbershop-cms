/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        barber: {
          900: '#1a1a1a',
          800: '#2d2d2d',
          700: '#3d3d3d',
          600: '#4d4d4d',
          gold: '#c9a227',
          'gold-light': '#e5c76b',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      }
    },
  },
  plugins: [],
}
