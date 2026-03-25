/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#E6EDF5',
          100: '#CCE0F0',
          200: '#99C1E1',
          300: '#66A2D2',
          400: '#3383C3',
          500: '#023D7F',
          600: '#023166',
          700: '#01254D',
          800: '#011933',
          900: '#010D1A',
        },
      },
    },
  },
  plugins: [],
};
