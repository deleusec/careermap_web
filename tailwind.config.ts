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
        'border' : 'var(--border)',
        'border-foreground' : 'var(--border-foreground)',
        'text' : 'var(--text)',
        'text-foreground' : 'var(--text-foreground)',
        'background' : 'var(--background)',
        'foreground' : 'var(--foreground)',
        'button' : 'var(--button)',
        'primary' : 'var(--primary)',
        'secondary' : 'var(--secondary)',
      },
    },
  },
  plugins: [],
}
