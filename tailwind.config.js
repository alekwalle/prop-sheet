/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif"
        ]
      },
      colors: {
        slate: {
          950: "#0b1222"
        },
        brand: {
          50: "#f1fbf6",
          100: "#d9f4e6",
          200: "#b4e8ce",
          300: "#86d9b2",
          400: "#4fc38f",
          500: "#2aa371",
          600: "#1b875c",
          700: "#176c4b",
          800: "#15573f",
          900: "#124836"
        }
      },
      boxShadow: {
        card: "0 10px 30px -12px rgba(15, 23, 42, 0.25)"
      }
    }
  },
  plugins: []
};
