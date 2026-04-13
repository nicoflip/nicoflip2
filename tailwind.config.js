/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-orange': '#ea580c', // Orange-600
        'brand-orange-light': '#fb923c', // Orange-400
        'brand-dark': '#1a1a1a', // Neutral-900
        'brand-gray': '#f5f5f5', // Neutral-100
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'], // Keeping Outfit for headings is fine, it's clean.
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
}
