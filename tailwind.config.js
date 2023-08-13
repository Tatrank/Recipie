/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "media",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      primary: {
        dark: "#176B87",
        light: "#176B87",
      },
      secondary: {
        dark: "#64CCC5",
        light: "#fbfefe",
      },
      accent: { dark: "#edafca", light: "#d13277" },
      background: { dark: "#001C30", light: "#DAFFFB" },
      text: { dark: "#DAFFFB", light: "#001C30" },
    },
    extend: {},
  },
  plugins: [require("flowbite/plugin")],
};
