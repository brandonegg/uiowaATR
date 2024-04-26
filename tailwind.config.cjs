/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        expand_in_out: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.1)" },
        },
        slide_left_full: {
          "0%": { transform: "translate(0%)" },
          "100%": { transform: "translate(-50%)" },
        },
        slide_right_full: {
          "0%": { transform: "translate(-50%)" },
          "100%": { transform: "translate(0%)" },
        },
        wiggle_rotate: {
          "0%, 60%, 100%": { transform: "rotate(0deg)" },
          "42%": { transform: "rotate(-6deg)" },
          "50%": { transform: "rotate(4deg)" },
          "6%, 30%": { transform: "rotate(24deg)" },
          "18%": { transform: "rotate(-12deg)" },
        },
      },
      animation: {
        expand_in_out: "expand_in_out 2s ease-in-out infinite",
        slide_search_page: "slide_left_full 0.5s ease-in-out",
        slide_search_page_backwards: "slide_right_full 0.5s ease-in-out",
        hand_wave: "wiggle_rotate 1.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

module.exports = config;
