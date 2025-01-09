/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'border' : 'var(--border)',
        'background' : 'var(--background)',
        'foreground' : 'var(--foreground)',
        'primary' : 'var(--primary)',
        'secondary' : 'var(--secondary)',

      },
    },
  },
  plugins: [],
}
