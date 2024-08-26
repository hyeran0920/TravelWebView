/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
      extend: {
        screens: {
          'custom-lg': '1300px',
        },
        fontSize: {
          '2xs': '0.625rem', // 10px
          '3xs': '0.5rem',   // 8px
          '4xs': '0.375rem', // 6px
          '5xs': '0.25rem',  // 4px
        },
      },
    },
    plugins: [],
  }
  