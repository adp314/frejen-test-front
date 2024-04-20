/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "maravilhas-white": {
          100: "#FFFFFF",
        },
        "maravilhas-black": {
          100: "#000000",
        },
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
      boxShadow: {
        first: "0px 16px 48px 0px rgba(0, 0, 0, 0.05), 0px 4px 24px 0px rgba(0, 0, 0, 0.10), 0px 1px 12px 0px rgba(0, 0, 0, 0.05)",
        second: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
        third: "0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px -1px rgba(0,0,0,.1)",
      },
      borderWidth: {
        1.5: "1.5px",
      },
      borderRadius: {
        "4xl": "36px",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
        },
      },
      screens: {
        xs: "475px",
      },
      maxWidth: {
        "8xl": "1340px",
      },
    },
  },
  plugins: [require("daisyui")],
};
