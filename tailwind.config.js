/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.tsx",
    "./pages/**/*.tsx",
    "./components/**/*.tsx",
    "./ui/**/*.tsx",
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      fontFamily: {
        dmsans: ["Alegreya Sans", "sans-serif"],
        dmserif: ["Alegreya", "serif"],
      },
    },
  },
  plugins: [],
};
