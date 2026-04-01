/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
      colors: {
        bg: 'var(--bg)',
        fg: 'var(--fg)',
        accent: 'var(--accent)',
        surface: 'var(--surface)',
        border: 'var(--border)',
        muted: 'var(--muted)',
      },
    },
  },
  plugins: [],
}
