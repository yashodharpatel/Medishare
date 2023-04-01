/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'primary-dark': '#9356FB',
        'primary-light': '#D772EA',
        'primary-black': "#171717",
        'primary-gray': "#EEEEEE",
      },
      fontFamily: {
        ourfont: ["Poppins", "serif"], 
      },
      boxShadow: {
        "main-sd": "1px 1px 7px 2px rgba(0, 0, 0, 0.25)",
        "primary-sd": "1px 1px 20px rgba(0, 0, 0, 0.2)",
        "secondary-sd": "0 5px 15px rgb(0, 0, 0, 0.07)",
      },
      container: {
        center: true,
      },
    },
  },
  plugins: [],
};
