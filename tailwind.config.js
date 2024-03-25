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
        dark: "#0074B7",
        light: "#176B87",
      },
      secondary: {
        dark: "#60A3D9",
        light: "#fbfefe",
      },
      accent: { dark: "#60A3D9", light: "#d13277" },
      background: { dark: "#003B73", light: "#DAFFFB" },
      text: { dark: "#DAFFFB", light: "#001C30" },
    },
    extend: {},
  },
  plugins: [require("flowbite/plugin")],
};
