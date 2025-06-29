// tailwind.config.ts
export default {
  darkMode: "class", // ✅ Enables toggling dark mode via the `.dark` class
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
