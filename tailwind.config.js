/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        mainText: "#fcfcfc",
      },
      backgroundColor: {
        sideBar: "#E5F8C6",
        body: "#3a3e44",
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
        nav: "0px 3px 5px rgba(0, 0, 0, 0.7)",
        footer: "5px 0px 5px rgba(0, 0, 0, 0.7)",
      },
    },
  },
  plugins: [],
};
