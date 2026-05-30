/** @type {import('tailwindcss').Config} */
export default {
  // Perbaikan pada bagian path: menggunakan ** untuk rekursif ke semua folder
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb", // Biru profesional
        "dark-bg": "#0f172a", // Navy gelap untuk kesan tech
      },
    },
  },
  plugins: [],
};
