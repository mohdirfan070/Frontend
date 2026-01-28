/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        nutricare: {
          DEFAULT: "#4CAF50",       // base green
          light: "#A5D6A7",         // for hover or backgrounds
          dark: "#2E7D32",          // for buttons or accents
        },
        pvt:{
          
          accent: "#FF5A1F",          // vibrant orange for scan button
          color1: '#353535',
          color2: '#3c6e71',
          color3: '#ffffff',
          color4: '#d9d9d9',
          color5: '#284b63',
          color6:"#A4C3B2",
          
        }
      },
    },
  },
  plugins: [],
}

