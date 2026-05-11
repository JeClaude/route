/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // ✅ Add this line to enable dark mode
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#F68B1F",
        "primary-dark": "#d97a17",
        "brand-gray": "#D8D8D8",
        "dark-fg": "#212121",
      },
      fontFamily: {
        display: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Courier New", "monospace"],
      },
    },
  },
  plugins: [],
};