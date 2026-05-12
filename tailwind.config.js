/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mainblue: '#0a4ea0',
        secondblue: '#098fd1',
        secondary: '#f6f5f5',
        whiteprime: '#f9fafa',
        thirdgrey: '#64748b',
        primaryoren: '#f5c542',
        darknavy: '#063f7f',
        textgray: '#52645c',
      },
      fontFamily: {
        jakarta: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
}
