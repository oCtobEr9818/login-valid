/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        options: "#7D76E9",
        options_hover: "#faf3f3",
      },
      backgroundColor: {
        sideBar: "#E5F8C6",
        options: "#faf3f3",
        options_hover: "#676492",
      },
      borderColor: {
        options: "#bab",
      },
      borderWidth: {
        1: "1px",
      },
      height: {
        eticaLogo: "4.2rem",
      },
      boxShadow: {
        sideBar: "5px 0 5px rgba(0, 0, 0, 0.7)",
      },
    },
  },
  plugins: [],
};
