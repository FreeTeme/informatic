module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        black: "var(--black)",
        "black-60": "var(--black-60)",
        blue: "var(--blue)",
        "blue-other": "var(--blue-other)",
        white: "var(--white)",
        "white-10": "var(--white-10)",
        "white-60": "var(--white-60)",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        "1920-button": "var(--1920-button-font-family)",
        "1920-date": "var(--1920-date-font-family)",
        "1920-description": "var(--1920-description-font-family)",
        "1920-description-2": "var(--1920-description-2-font-family)",
        "1920-h1": "var(--1920-h1-font-family)",
        "1920-h2": "var(--1920-h2-font-family)",
        "1920-h3": "var(--1920-h3-font-family)",
        "1920-h4": "var(--1920-h4-font-family)",
        "1920-h5": "var(--1920-h5-font-family)",
        "1920-h6": "var(--1920-h6-font-family)",
        "1920-hint": "var(--1920-hint-font-family)",
        "1920-link": "var(--1920-link-font-family)",
        "1920-link-2": "var(--1920-link-2-font-family)",
        "1920-link-3": "var(--1920-link-3-font-family)",
        "1920-num": "var(--1920-num-font-family)",
        "1920-txt": "var(--1920-txt-font-family)",
        "1920-txt-2": "var(--1920-txt-2-font-family)",
        sans: [
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
    container: { center: true, padding: "2rem", screens: { "2xl": "1400px" } },
  },
  plugins: [],
  darkMode: ["class"],
};
