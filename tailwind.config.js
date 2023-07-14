/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'bus_seats': 'repeat(50px, 1fr) repeat(50px, 1fr) repeat(100px, 2fr) repeat(50px, 1fr) repeat(50px, 1fr)',
      }
    },
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require('tailwind-scrollbar'),
  ],
}