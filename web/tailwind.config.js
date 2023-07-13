/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: { sans: "Roboto, sans-serif" },
      colors: {
        gray: {
          600: "#323238",
          100: "#E1E1E6",
          800: "#202024",
          900: "#121214",
          300: "#8D8D99",
        },
        ignite: {
          500: "#129E57",
        },
        yellow: {
          500: "#F7DD43",
          700: "E5cd3d",
        },
      },
      backgroundImage: {
        app: "url(/app-bg.png)",
      },
    },
  },
  plugins: [],
};
