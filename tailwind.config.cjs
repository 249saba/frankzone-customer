/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      dropShadow: {
        "3xl": "0 3px 41px #00000008",
        "4xl": "0px 6px 12px #00000029",
      },
      boxShadow: {
        "3xl": "0px 8px 18px #00000029",
        "4xl": "0px 3px 6px #00000029",
        "5xl": "0px 6px 12px #00000029",
      },

      fontFamily: {
        poppins: ["Poppins"],
      },
      colors: {
        black: {
          100: "#1B1B1B",
          200: "#edf2f7",
          300: "#e2e8f0",
          400: "#cbd5e0",
          500: "#a0aec0",
          600: "#718096",
          700: "#100909",
          800: "#2d3748",
          900: "#051917",
        },

        white: "#fff",
        blue: {
          100: "#7580F233",
          200: "#7580F233",
          300: "#7580F233",
          400: "#7580F233",
          500: "#7580F233",
          600: "#7580F233",
          700: "#7580F233",
          800: "#7580F233",
          900: "#7580F2",
        },
        gray: {
          600: "#F7F7F7",
          700: "#FBFBFB",
          800: "#F0F0F0",
          900: "#989898",
        },
        red: { 100: "#F44336" },
        yellow: { 100: "#ECC74F" },
        green: {
          600: "#27B1A41A",
          700: "#177067",
          800: "#27B1A4",
          900: "#54CF2E",
        },
        transparent: "transparent",
      },
      width: {
        128: "32rem",
      },
      screens: {
        sm: { min: "350px", max: "767px" },
        // => @media (min-width: 640px and max-width: 767px) { ... }
        md: { min: "768px", max: "1100px" },
        lg: "1101px",
        xl: "1440px",
      },
      // gridTemplateColumns: {
      //   'card': '200px minmax(100px, 1fr) 100px',
      // }
    },
  },
  plugins: [],
});
