import type { Config } from "tailwindcss";

// Identidade visual PAUSE — cores extraídas da logo oficial (public/brand/logo-pause-original.jpg).
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Verde da marca: 300 = sálvia da logo (#a7bda8), 700 = verde escuro da logo (#2c4b3c)
        brand: {
          50: "#f2f5f2",
          100: "#e3eae4",
          200: "#c8d6ca",
          300: "#a7bda8",
          400: "#7f9c86",
          500: "#4f705b",
          600: "#3d5f4c",
          700: "#2c4b3c",
          800: "#243d31",
          900: "#1b2e25",
        },
        // Lilás da logo: `soft` só para detalhes decorativos; DEFAULT (mais escuro) para selos com texto.
        accent: { DEFAULT: "#6f5a8c", soft: "#a795bb" },
        cream: "#f6f5f0",
        ink: "#22312a",
      },
      fontFamily: {
        sans: ["Montserrat", "system-ui", "sans-serif"],
        display: ["Italiana", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
