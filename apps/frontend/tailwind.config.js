/** @type {import('tailwindcss').Config} */
import plugin from "tailwindcss/plugin";
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-lato)"],
        serif: ["var(--font-merriweather)"],
      },
      colors: {
        "accent-1": "#FAFAFA",
        "accent-2": "#EAEAEA",
        "accent-7": "#333",
        success: "#0070f3",
        cyan: "#79FFE1",
        neutral: {
          DEFAULT: "#f5f1ed",
          dark: "#ece6e0"
        },
      },
      spacing: {
        28: "7rem",
      },
      letterSpacing: {
        tighter: "-.04em",
      },
      lineHeight: {
        tight: 1.2,
      },
      fontSize: {
        "5xl": "2.5rem",
        "6xl": "2.75rem",
        "7xl": "4.5rem",
        "8xl": "6.25rem",
      },
      boxShadow: {
        small: "0 5px 10px rgba(0, 0, 0, 0.12)",
        medium: "0 8px 30px rgba(0, 0, 0, 0.12)",
        "3xl": "0 35px 60px -15px rgba(0, 0, 0, 0.3)",
      },

      animation: {
        "grow-shrink": "grow-shrink 0.7s alternate infinite",
      },
      keyframes: {
        "grow-shrink": {
          "0%, 100%": { height: "100%" },
          "50%": { height: "0%" },
        },
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          "animate-delay": (value) => {
            return {
              "animation-delay": value,
            };
          },
        },
        {
          values: theme("transitionDelay"),
        }
      );
    }),
  ],
};
