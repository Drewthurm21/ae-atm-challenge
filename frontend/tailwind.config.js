/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'modal-overlay': "url('./src/assets/images/modalOverlay.png')",
        'ae-logo': "url('./src/assets/images/ae-logo-web-color.png')",
      },
      colors: {
        'accent': '#10ba68',
        'primary': {
          100: '#824BFF',
          200: '#6500B0',
        },
      },
      fontFamily: {
        primary: ['Avenir', 'sans-serif'],
      },
    },
  },
  plugins: [],
}