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
      /* pink: {
        [300]: '#F6E9E7',
        [500]: '#BD5B48',
        [700]: '#A7250B',
      },
      cyan: {
        [300]: '#F4F1F3',
        [500]: '#917484',
        [700]: '#6D465B',
        [900]: '#3D142A',
      },
      yellow: {
        [300]: '#E5A66A',
        [500]: '#DD8838',
      },
      green: {
        [500]: '#2CA061',
        [700]: '#27804F',
      }, */
      pink: {
        [300]: '#FFE0F6',
        [500]: '#FDEEEE',
        [700]: '#E0007F',
      },
      cyan: {
        [300]: '#faf2f2',
        [500]: '#EA62AF',
        [700]: '#660039',
        [900]: '#52002E',
      },
      yellow: {
        [300]: '#DEB64B',
        [500]: '#DEB64B',
      },
      green: {
        [500]: '#D60079',
        [700]: '#AD0062',
      },
      white: '#FFFFFF',
      dark: '#120208',
      backdrop: '#9174844D',
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
