/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ffe45e',
        secondary: '#7fc8f8',
        accent: '#ff6392',
        info: '#5aa9e6',
        light: '#f9f9f9',
        eel: '#4b4b4b',
      },
      fontFamily: {
        'straw-milky': ['Straw Milky', 'sans-serif'],
      },

      keyframes: {
        pong: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
      },
      animation: {
        pong: 'pong 0.3s ease-in-out',
      },
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '@media print': {
          '.print\\:hidden': {
            display: 'none',
          },
        },
      });
    },
  ],
}
