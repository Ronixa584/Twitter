import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    screens: {
      xs: "475px", // Custom size for extra small devices
      sm: "640px", // Existing small size (you can override if needed)
      md: "768px", // Existing medium size
      lg: "1024px", // Existing large size
      xl: "1280px", // Existing extra large size
      "2xl": "1536px", // Existing 2x large size
      "lgxl": "1500px", // Custom size
      "custom-extra": "1600px", // Another custom size
    },
  },
  plugins: [],
};
export default config;
