import type { Config } from "tailwindcss";
import daisyui from "daisyui";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./features/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        ink: "#203040",
        panel: "rgba(255,255,255,0.04)",
        line: "rgba(255,255,255,0.10)",
        mint: "#2A9D8F",
        coral: "#E76F51",
        citrus: "#F4A261",
        brand: {
          DEFAULT: "#2A9D8F",
          light: "#E9C46A",
          dark: "#264653"
        },
        accent: "#E76F51",
        surface: "#203040"
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "SFMono-Regular", "monospace"]
      },
      boxShadow: {
        glow: "0 0 60px rgba(42, 157, 143, 0.18)",
        soft: "0 24px 80px rgba(0,0,0,0.40)",
        "brand-sm": "0 2px 12px rgba(42, 157, 143, 0.20)"
      },
      backgroundImage: {
        "radial-grid": "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.18) 1px, transparent 0)"
      },
      animation: {
        "spin-slow": "spin 25s linear infinite",
        "blob": "blob 8s ease-in-out infinite",
        "gradient": "gradient-shift 4s ease infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite"
      },
      keyframes: {
        blob: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(30px, -20px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" }
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" }
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(42, 157, 143, 0.15)" },
          "50%": { boxShadow: "0 0 40px rgba(42, 157, 143, 0.3)" }
        }
      }
    }
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        night: {
          primary: "#2A9D8F",
          secondary: "#E76F51",
          accent: "#F4A261",
          neutral: "#203040",
          "base-100": "#203040",
          "base-200": "#182530",
          "base-300": "#263848",
          "base-content": "#f8fafc",
          info: "#2A9D8F",
          success: "#2A9D8F",
          warning: "#F4A261",
          error: "#E76F51"
        }
      },
      {
        light: {
          primary: "#2A9D8F",
          secondary: "#E76F51",
          accent: "#F4A261",
          neutral: "#264653",
          "base-100": "#FEFAF6",
          "base-200": "#F5F0EB",
          "base-300": "#E0D8CF",
          "base-content": "#264653",
          info: "#2A9D8F",
          success: "#2A9D8F",
          warning: "#F4A261",
          error: "#E76F51"
        }
      }
    ]
  }
};

export default config;
