
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
      keyframes: {
        scale: {
          '0%, 40%, 100%': {transform: 'scaleY(0.9)'},
          '20%': {transform: 'scaleY(2.5)'}
        }
      },
      animation: {
        scale: 'scale 1s infinite ease-in-out'
      },
      fontFamily: {
        poppins: ['"Poppins"', ...defaultTheme.fontFamily.sans],
        nunito: ['"Nunito Sans"', ...defaultTheme.fontFamily.sans],
      },
      width: {
        110: '28rem',
        124: '32rem',
      },
      colors: {
        primary: colorWithOpacity('--primary'),
        secondary: colorWithOpacity('--secondary'),
        accent: {
          orange: colorWithOpacity('--accent-orange'),
          grey: colorWithOpacity('--accent-grey'),
        },
      },
      fontSize: {
        '10xl': ['16rem', '1'],
        '2xs': ['0.65rem', '0.75rem'],
        '3xs': ['0.50rem', '0.65rem'],
       
      },
      backgroundImage: {
        'money-pattern': "url('/src/assets/emilio-takas-_GNVwZJv-Jo-unsplash-lg.jpg')",
      },
    },
  },
  variants: {
    extend: {
      display: ['group-hover'],
      boxShadow: ['disabled'],
      padding: ['disabled'],
      borderColor: ['disabled'],
      textColor: ['disabled']
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/line-clamp'), function ({addUtilities}) {
    const extendLineThrough = {
        '.line-through': {
            'textDecoration': 'line-through',
            'text-decoration-color': '#3854a6',
            'text-decoration-thickness': '2px'
        },
    }
    addUtilities(extendLineThrough)
}],
}
