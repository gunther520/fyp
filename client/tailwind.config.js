/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx,html}', './public/index.html'],
  content: [],
  theme: {
    colors: {
      'transparent': 'transparent',
      'current': 'currentColor',
      'white': '#ffffff',
      'black': '#1d1d1f',
      'green': {
        'default': '#627b80',
        'light-green': '#dee7ea',
      },
      'red': '#dc3f56',
      'warning-red': {
        'heavy': '#ef4444',
        'light': '#fecaca',
      },
      'slate':{
        'light':'#94a3b8',
      },
      'gray':{
        'light':'#f7f7f7',
      },
      'blue': {
        'light': '#93c5fd'
      },
    },
    extend: {

    },
  },
  plugins: [],
}

