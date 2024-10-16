/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: ["w-6/12", "w-7/12", "w-8/12", "w-9/12", "w-10/12", "w-11/12"],
  theme: {
    extend: {
      colors: {
        primary: "#ded4ec", // for background
        secondary: "#d1c9dd", // for cards
        taskbar_main: "#bab7b7",
        taskbar_button: "#bab7cb",
        taskbar_button_hover: "#a19eaf",
        taskbar_border: "#a9a9a9",
      },
      fontSize: {
        navbar: 22,
      },
    },
  },
  plugins: [],
};
