/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        active: 'var(--color-active)',
        background: 'var(--color-background)',
        text: 'var(--color-text)',
        alttext: 'var(--color-alttext)'
      }
    }
  },
  plugins: []
};
