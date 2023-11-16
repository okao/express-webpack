/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // views/pages/*.ejs
    "./views/**/*.{ejs,js}",
    // public/*.js
    "./public/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
    require("tailwindcss-children"),
  ],
};
