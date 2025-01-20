/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"], 
      },
      colors: {
        'primary': '#583cec',
        'secondary': '#e9e5e5' 
      }
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
