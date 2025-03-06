import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#162717",
        "primary-30": "#7D6D22",
        secondary: "#D6AB39",
        "secondary-30": "#AF9627",
        white: "#F6F6EA",
      },
    },
  },
  plugins: [],
} satisfies Config;
