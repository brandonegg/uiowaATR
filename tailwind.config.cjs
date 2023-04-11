/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        expand_in_out: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
      },
      animation: {
        expand_in_out: 'expand_in_out 2s ease-in-out infinite',
      }
    },
  },
  plugins: [],
};

module.exports = config;
