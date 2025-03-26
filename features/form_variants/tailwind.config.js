import { heroui } from "@heroui/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            primary: {
              50: "#ECEEFE",
              100: "#D8DDFD",
              200: "#B1BBFB",
              300: "#8B98F9",
              400: "#6476F7",
              500: "#606FF2", // Your primary color
              600: "#4D59C2",
              700: "#3A4391",
              800: "#262C61",
              900: "#131630",
              DEFAULT: "#606FF2",
              foreground: "#FFFFFF",
            },
            background: "#FFFFFF",
          },
        },
        dark: {
          colors: {
            primary: {
              50: "#131630",
              100: "#262C61",
              200: "#3A4391",
              300: "#4D59C2",
              400: "#606FF2",
              500: "#606FF2", // Your primary color
              600: "#8B98F9",
              700: "#B1BBFB",
              800: "#D8DDFD",
              900: "#ECEEFE",
              DEFAULT: "#606FF2",
              foreground: "#000000",
            },
            background: "#000000",
          },
        },
      },
    }),
  ],
};
