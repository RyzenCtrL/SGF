import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "20px",
        md: "32px",
        lg: "40px",
      },
    },
    extend: {
      colors: {
        "bg-primary": "rgb(var(--bg-primary) / <alpha-value>)",
        "bg-secondary": "rgb(var(--bg-secondary) / <alpha-value>)",
        "bg-card": "rgb(var(--bg-card) / <alpha-value>)",
        "bg-card-hover": "rgb(var(--bg-card-hover) / <alpha-value>)",
        "stroke-subtle": "rgb(var(--stroke-subtle) / <alpha-value>)",
        "text-primary": "rgb(var(--text-primary) / <alpha-value>)",
        "text-secondary": "rgb(var(--text-secondary) / <alpha-value>)",
        "text-tertiary": "rgb(var(--text-tertiary) / <alpha-value>)",
        "accent-lime": "rgb(var(--accent-lime) / <alpha-value>)",
        "accent-lime-hover": "rgb(var(--accent-lime-hover) / <alpha-value>)",
        "accent-lime-pressed": "rgb(var(--accent-lime-pressed) / <alpha-value>)",
        "accent-on-lime": "rgb(var(--accent-on-lime) / <alpha-value>)",
        "state-error": "rgb(var(--state-error) / <alpha-value>)",
        "state-success": "rgb(var(--state-success) / <alpha-value>)",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      fontSize: {
        display: [
          "clamp(2.75rem, 1.3rem + 5.6vw, 7.25rem)",
          { lineHeight: "0.98", fontWeight: "600", letterSpacing: "-0.02em" },
        ],
        h1: ["clamp(2.125rem, 1.55rem + 2.7vw, 4rem)", { lineHeight: "1.06", fontWeight: "600" }],
        h2: ["clamp(1.75rem, 1.4rem + 1.6vw, 3rem)", { lineHeight: "1.125", fontWeight: "600" }],
        h3: ["clamp(1.25rem, 1.1rem + 0.7vw, 1.75rem)", { lineHeight: "1.2", fontWeight: "500" }],
        "body-lg": ["clamp(1rem, 0.93rem + 0.3vw, 1.25rem)", { lineHeight: "1.5", fontWeight: "400" }],
        body: ["1rem", { lineHeight: "1.625", fontWeight: "400" }],
        caption: ["0.8125rem", { lineHeight: "1.4", fontWeight: "500", letterSpacing: "0.08em" }],
        counter: ["clamp(3.5rem, 2.9rem + 2.6vw, 6rem)", { lineHeight: "1", fontWeight: "600" }],
      },
      maxWidth: {
        container: "1360px",
        prose: "640px",
      },
      borderRadius: {
        card: "16px",
        control: "12px",
      },
      spacing: {
        "section-desktop": "140px",
        "section-inner": "100px",
        "section-mobile": "64px",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "float-a": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(70px, 50px) scale(1.15)" },
        },
        "float-b": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(-60px, -40px) scale(1.1)" },
        },
      },
      animation: {
        marquee: "marquee 32s linear infinite",
        "float-a": "float-a 24s ease-in-out infinite",
        "float-b": "float-b 28s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
