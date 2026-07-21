/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        void: {
          DEFAULT: "rgb(var(--void) / <alpha-value>)",
          soft: "rgb(var(--void-soft) / <alpha-value>)",
          dim: "rgb(var(--void-dim) / <alpha-value>)",
        },
        paper: {
          DEFAULT: "rgb(var(--paper) / <alpha-value>)",
          dim: "rgb(var(--void-dim) / <alpha-value>)",
        },
        signal: {
          DEFAULT: "rgb(var(--signal) / <alpha-value>)",
          dim: "rgb(var(--signal-dim) / <alpha-value>)",
          light: "rgb(var(--signal-light) / <alpha-value>)",
        },
        circuit: {
          DEFAULT: "rgb(var(--circuit) / <alpha-value>)",
          dim: "rgb(var(--circuit-dim) / <alpha-value>)",
        },
        slate: {
          DEFAULT: "rgb(var(--slate) / <alpha-value>)",
          soft: "rgb(var(--slate-soft) / <alpha-value>)",
          line: "rgb(var(--slate-line) / <alpha-value>)",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      animation: {
        trace: "trace 3.2s linear infinite",
        "fade-up": "fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        float: "float 6s ease-in-out infinite",
        "pulse-ring": "pulseRing 2.4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "logo-fill": "fillUp 1.5s cubic-bezier(0.65, 0, 0.35, 1) forwards",
        "logo-draw": "logoDraw 1.4s cubic-bezier(0.65, 0, 0.35, 1) forwards",
        "glow-pulse": "glowPulse 3.6s ease-in-out infinite",
        "underline-draw": "underlineDraw 0.6s ease-out forwards",
      },
      keyframes: {
        trace: {
          "0%": { strokeDashoffset: "1000" },
          "100%": { strokeDashoffset: "0" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseRing: {
          "0%": { transform: "scale(0.9)", opacity: "0.6" },
          "70%": { transform: "scale(1.4)", opacity: "0" },
          "100%": { transform: "scale(1.4)", opacity: "0" },
        },
        logoDraw: {
          "0%": { strokeDashoffset: "420" },
          "100%": { strokeDashoffset: "0" },
        },
        glowPulse: {
          "0%, 100%": { filter: "drop-shadow(0 0 0px rgba(59,196,230,0.35))" },
          "50%": { filter: "drop-shadow(0 0 10px rgba(59,196,230,0.55))" },
        },
        underlineDraw: {
          "0%": { strokeDashoffset: "150" },
          "100%": { strokeDashoffset: "0" },
        },
        fillUp: {
          "0%": { clipPath: "inset(100% 0 0 0)" },
          "100%": { clipPath: "inset(0% 0 0 0)" },
        },
      },
    },
  },
  plugins: [],
};

