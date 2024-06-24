/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx,html}', './public/index.html'],
  content: [],
  theme: {
    extend: {
      //   colors:{
      //   'main-theme': '#6b7280',
      //   'alt-theme':'#D15976'
      // },
    },
  },
  plugins: [],
}

