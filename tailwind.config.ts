import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f6f3fb",
          100: "#ece5f6",
          200: "#d8cbec",
          300: "#bba4dc",
          400: "#9b79c8",
          500: "#7f57b3",
          600: "#6a4497",
          700: "#57377b",
          800: "#472f64",
          900: "#3b2852",
        },
        cream: "#fbf8f3",
        accent: "#e8a87c",
      },
      fontFamily: {
        sans: ["Nunito Sans", "system-ui", "sans-serif"],
        display: ["Playfair Display", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
