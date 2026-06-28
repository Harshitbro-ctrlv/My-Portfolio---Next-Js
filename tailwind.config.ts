import type { Config } from "tailwindcss";
import daisyui from "daisyui";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./features/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        ink: "#06070a",
        panel: "rgba(255,255,255,0.07)",
        line: "rgba(255,255,255,0.12)",
        mint: "#7ce7c8",
        coral: "#ff8a7a",
        citrus: "#f6d365"
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "SFMono-Regular", "monospace"]
      },
      boxShadow: {
        glow: "0 0 60px rgba(124, 231, 200, 0.18)",
        soft: "0 24px 80px rgba(0,0,0,0.34)"
      },
      backgroundImage: {
        "radial-grid": "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.18) 1px, transparent 0)"
      }
    }
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        night: {
          primary: "#7ce7c8",
          secondary: "#ff8a7a",
          accent: "#f6d365",
          neutral: "#0d1117",
          "base-100": "#06070a",
          "base-200": "#0b0f14",
          "base-300": "#111822",
          "base-content": "#f7fafc",
          info: "#7dd3fc",
          success: "#86efac",
          warning: "#facc15",
          error: "#fb7185"
        }
      },
      {
        light: {
          primary: "#0ea5e9",
          secondary: "#f97316",
          accent: "#8b5cf6",
          neutral: "#f1f5f9",
          "base-100": "#ffffff",
          "base-200": "#f8fafc",
          "base-300": "#e2e8f0",
          "base-content": "#0f172a",
          info: "#0284c7",
          success: "#16a34a",
          warning: "#d97706",
          error: "#dc2626"
        }
      }
    ]
  }
};

export default config;
