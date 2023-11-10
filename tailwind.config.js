/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        mainText: "#fcfcfc",
      },
      backgroundColor: {
        body: "#3a3e44",
        outline: "#212327",
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
        sideBar: "3px 0px 5px rgba(0, 0, 0, 0.7)",
        nav: "2px 3px 3px rgba(0, 0, 0, 0.7)",
        footer: "5px 1px 5px rgba(0, 0, 0, 0.7)",
      },
    },
  },
  plugins: [],
};
