const defaultTheme = require('tailwindcss/defaultTheme');

function colorWithOpacity(variableName) {
  return ({ opacityValue }) => {
    if (!opacityValue) {
      return `rgb(var(${variableName}))`;
    }
    return `rgba(var(${variableName}), ${opacityValue})`;
  };
}

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        poppins: ['"Poppins"', ...defaultTheme.fontFamily.sans],
        nunito: ['"Nunito Sans"', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: colorWithOpacity('--primary'),
        secondary: colorWithOpacity('--secondary'),
        accent: {
          orange: colorWithOpacity('--accent-orange'),
          grey: colorWithOpacity('--accent-grey'),
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms'),],
}
