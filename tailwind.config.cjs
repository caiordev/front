/** @type {import('tailwindcss').Config} */
module.exports = {
  //Specify the file formats where tailwind shoudl work
  content: ["./src/**/*.{html,js,jsx,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        branco: "rgb(233, 228, 222)",
        cinza: "rgb(205, 215, 224)",
      },
    },
  },
  plugins: [
    require("postcss-nested"),
    require("tailwindcss"),
    require("autoprefixer"),
  ],
};
