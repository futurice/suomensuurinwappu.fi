const defaultTheme = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    borderRadius: {
      none: '0',
      sm: '0.25rem',
      DEFAULT: '0.5rem',
      md: '1rem',
      lg: '2rem',
      full: '9999px',
    },
    colors: {
      pink: {
        [300]: '#FFE1EF',
        [500]: '#FF94BF',
        [700]: '#C81C6F',
      },
      cyan: {
        [300]: '#DEF8FF',
        [500]: '#38AECC',
        [700]: '#0080A1',
        [900]: '#006C88',
      },
      yellow: {
        [300]: '#FFCA7A',
        [500]: '#FE9D0B',
      },
      white: '#FFFFFF',
      dark: '#120208',
      backdrop: '#0080A14D',
      current: 'currentColor',
    },
    fontFamily: {
      body: ['Rubik', 'sans-serif'],
      heading: ['Inter', 'sans-serif'],
    },
    screens: {
      xs: '416px',
      ...defaultTheme.screens,
    },
    extend: {
      fontSize: {
        '2xs': '0.625rem',
      },
      keyframes: {
        loading: {
          '0%, 80%': { transform: 'translateY(0)' },
          '40%': { transform: 'translateY(-100%)' },
          '60%': { transform: 'translateY(10%)' },
        },
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant('enter', '&[data-enter]');
    }),
  ],
};
