const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  mode: 'jit',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      'xs': '475px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px'
    },
    extend: {
      fontFamily: {
        'sans': ['"Noto Sans"', ...defaultTheme.fontFamily.sans],
      },
      gridTemplateColumns: {
        'cartXL': '1fr 1.5fr 0.6fr 0.8fr 0.6fr 40px',
        'cart-title': '0.8fr 1.5fr',
        'cart': '0.8fr 0.5fr 0.5fr 0.5fr',
      }
    },
  },
  plugins: [require("daisyui"), require('tw-elements/dist/plugin')],
  daisyui: {
    themes: ['lemonade'],
    prefix: 'daisy-',
  }
}
