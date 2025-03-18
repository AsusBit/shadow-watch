/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
        colors: {
            "city-blue": "#0b2e5f",
            "city-red": "#80001b",
            "city-white": "#eeeeef",
            "city-bright-red": "#cf5254",
            "city-purple": "#8650bb",
            "city-bright-blue": "#0193db",
            "city-yellow": "#e7b333",
            "city-ocean": "#1da89d",
        },
        fontFamily: {
            "exo": "Exo 2",
            "silkscreen": "Silkscreen"
        },
        boxShadow: {
            "inner-xl": "inset 0 17px 20px rgba(0, 0, 0, 0.25)", // Custom inner shadow
        }
    },
  },
  plugins: [],
};