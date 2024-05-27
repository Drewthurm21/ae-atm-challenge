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
      }
    },
  },
  plugins: [],
}