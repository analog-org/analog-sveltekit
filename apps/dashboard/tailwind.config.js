import { fontFamily } from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";
import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{html,js,svelte,ts}",
    "../../node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}",
  ],
  safelist: ["dark"],
  plugins: [
    require("flowbite/plugin"),
    plugin(function ({ addVariant, matchUtilities, theme }) {
      addVariant("hocus", ["&:hover", "&:focus"]);
      // Square utility
      matchUtilities(
        {
          square: (value) => ({
            width: value,
            height: value,
          }),
        },
        { values: theme("spacing") }
      );
    }),
    typography,
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border) / <alpha-value>)",
        input: "hsl(var(--input) / <alpha-value>)",
        ring: "hsl(var(--ring) / <alpha-value>)",
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        primary: {
          DEFAULT: "hsl(var(--primary) / <alpha-value>)",
          foreground: "hsl(var(--primary-foreground) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
          foreground: "hsl(var(--secondary-foreground) / <alpha-value>)",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted) / <alpha-value>)",
          foreground: "hsl(var(--muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "hsl(var(--accent) / <alpha-value>)",
          foreground: "hsl(var(--accent-foreground) / <alpha-value>)",
        },
        popover: {
          DEFAULT: "hsl(var(--popover) / <alpha-value>)",
          foreground: "hsl(var(--popover-foreground) / <alpha-value>)",
        },
        card: {
          DEFAULT: "hsl(var(--card) / <alpha-value>)",
          foreground: "hsl(var(--card-foreground) / <alpha-value>)",
        },
        magnum: {
          50: "#fff9ed",
          100: "#fef2d6",
          200: "#fce0ac",
          300: "#f9c978",
          400: "#f7b155",
          500: "#f38d1c",
          600: "#e47312",
          700: "#bd5711",
          800: "#964516",
          900: "#793a15",
          950: "#411c09",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: [...fontFamily.sans],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            code: {
              position: "relative",
              borderRadius: theme("borderRadius.md"),
            },
          },
        },
      }),
    },
  },
};

export default config;
