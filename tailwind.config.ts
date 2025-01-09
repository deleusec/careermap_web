import animate from "tailwindcss-animate"

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
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
      fontFamily: {
        'sans': ['Barlow', 'sans-serif'],
      },
      colors: {
        // Base colors
        'background': 'var(--background)',
        'foreground': 'var(--foreground)',

        // Card colors
        'card': 'var(--card)',
        'card-foreground': 'var(--card-foreground)',

        // Text colors
        'text': 'var(--text)',
        'text-foreground': 'var(--text-foreground)',
        'text-secondary': 'var(--text-secondary)',
        // Border colors
        'border': 'var(--border)',
        'border-foreground': 'var(--border-foreground)',

        // Gray variations
        'gray': 'var(--gray)',

        // Primary and secondary colors
        'primary': 'var(--primary)',
        'secondary': 'var(--secondary)',

        // Blue variations
        'blue': 'var(--blue)',
        'blue-secondary': 'var(--blue-secondary)',

        // Status colors
        'destructive': 'var(--destructive)',
        'success': 'var(--success)',
      },
      borderRadius: {
        'DEFAULT': 'var(--radius)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [animate],
}
