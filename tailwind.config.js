/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  mode: 'jit',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
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
        'cartXL': '0.8fr 1.6fr 0.5fr 0.5fr 0.5fr 40px',
        'cartXL-order': '0.6fr 1.8fr 0.5fr 0.5fr 0.5fr',
        'cart-title': '0.8fr 1.5fr',
        'cart-below-sm': '0.3fr 0.8fr 0.3fr 0.2fr',
        'product-page': '0.8fr 1fr',
        // 'product-page': '0.15fr 0.7fr 0.7fr 0.3fr',
      },
      gridTemplateRows: {
        'shop-layout': 'auto 1fr',
        // 'product-page': '0.3fr 0.3fr 0.3fr'
        'product-page': 'minmax(0.1fr, 0.3fr) minmax(0.1fr, 0.3fr) minmax(0.1fr, 0.3fr)'
      },
    },
  },
  plugins: [require("daisyui"), require('@tailwindcss/container-queries')],
  daisyui: {
    themes: ['lemonade'],
    prefix: 'daisy-',
  }
}
