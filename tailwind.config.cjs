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
        slide_left_full: {
          '0%': { transform: 'translate(0%)' },
          '100%': { transform: 'translate(-50%)' },
        },
        slide_right_full: {
          '0%': { transform: 'translate(-50%)' },
          '100%': { transform: 'translate(0%)' },
        }
      },
      animation: {
        expand_in_out: 'expand_in_out 2s ease-in-out infinite',
        slide_survey_page: 'slide_left_full 0.5s ease-in-out',
        slide_survey_page_backwards: 'slide_right_full 0.5s ease-in-out'
      },
    },
  },
  plugins: [],
};

module.exports = config;
