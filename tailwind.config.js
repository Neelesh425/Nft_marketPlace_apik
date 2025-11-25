/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          900: '#0f172a',
          800: '#1e293b',
          700: '#334155',
        },
        purple: {
          400: '#c084fc',
          500: '#a855f7',
          900: '#581c87',
        },
        pink: {
          400: '#f472b6',
          900: '#831843',
        },
      },
    },
  },
  plugins: [],
};