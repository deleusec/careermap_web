/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
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

        // Border colors
        'border': 'var(--border)',
        'border-foreground': 'var(--border-foreground)',

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
    },
  },
  plugins: [],
}
