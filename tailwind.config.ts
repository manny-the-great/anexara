import type { Config } from "tailwindcss";

/**
 * Tailwind v4 CSS-first config — this file exists primarily for
 * VS Code IntelliSense (Tailwind CSS extension) so it can resolve
 * our custom design-token classes defined via @theme inline in globals.css.
 *
 * Runtime theming is still driven by globals.css @theme inline block.
 */
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian:        "#0A0A0A",
        "obsidian-card": "#121212",
        "obsidian-light":"#1A1A1A",
        silver:          "#C0C0C0",
        "silver-dim":    "rgba(192,192,192,0.15)",
        gold:            "#D4AF37",
        "gold-dim":      "rgba(212,175,55,0.2)",
        neon:            "#00FF88",
        "neon-dim":      "rgba(0,255,136,0.15)",
        "text-muted":    "#666666",
      },
      fontFamily: {
        display: ["var(--font-bodoni)", "serif"],
        body:    ["var(--font-montserrat)", "sans-serif"],
        ui:      ["var(--font-inter)", "sans-serif"],
        accent:  ["var(--font-cormorant)", "serif"],
      },
      boxShadow: {
        neon: "0 0 10px rgba(0,255,136,0.4), 0 0 20px rgba(0,255,136,0.1)",
        gold: "0 0 15px rgba(212,175,55,0.3)",
      },
    },
  },
  plugins: [],
};

export default config;
