/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'geist': ['Geist', 'system-ui', '-apple-system', 'sans-serif'],
        'sans': ['Geist', 'system-ui', '-apple-system', 'sans-serif'],
      },
      backgroundImage: {
        'cinema': "url('/src/assets/imgs/pexels-jibarofoto-2774556.jpg')",
      }
    },
  },
  plugins: [],
}