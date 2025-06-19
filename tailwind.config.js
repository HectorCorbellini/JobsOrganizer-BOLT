/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#1a202c',
        'bg-secondary': '#2d3748',
        'text-primary': '#f7fafc',
        'text-secondary': '#a0aec0',
        'border-primary': '#4a5568',
        'accent': '#3b82f6',
      },
    },
  },
  plugins: [],
};
