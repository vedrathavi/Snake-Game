/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        26: "repeat(26, minmax(0, 1fr))", // 26 equal columns
      },
      gridTemplateRows: {
        26: "repeat(26, minmax(0, 1fr))", // 26 equal rows
      },
    },
  },
  plugins: [],
};
