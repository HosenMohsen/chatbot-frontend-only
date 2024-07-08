/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-bg-color': '#EDE9E7', 
        'custom-top-color': '#263A8A',
      },
    },
  },
  plugins: [],
}

