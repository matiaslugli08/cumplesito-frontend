/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta de Cumpleaños - Rosa/Morado/Amarillo
        primary: {
          50: '#fdf4ff',
          100: '#fae8ff',
          200: '#f5d0fe',
          300: '#f0abfc',
          400: '#e879f9',
          500: '#d946ef', // Rosa/Fucsia brillante
          600: '#c026d3',
          700: '#a21caf',
          800: '#86198f',
          900: '#701a75',
        },
        party: {
          purple: '#9D4EDD', // Morado fiesta
          pink: '#FF006E',   // Rosa chicle
          yellow: '#FFD60A', // Amarillo brillante
          orange: '#FF6B35', // Naranja mandarina
          blue: '#4CC9F0',   // Azul cielo
          mint: '#06FFA5',   // Verde menta
        },
      },
    },
  },
  plugins: [],
}
