module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    colors: {
      pink: {
        [300]: '#FFE1EF',
        [500]: '#FF94BF',
        [700]: '#C81C6F',
      },
      cyan: {
        [500]: '#38AECC',
        [700]: '#0080A1',
        [900]: '#006C88',
      },
      yellow: {
        [300]: '#FFCA7A',
        [500]: '#FE9D0B',
      },
      white: '#FFFFFF',
      backdrop: '#0000007F',
    },
    borderRadius: {
      none: '0',
      sm: '0.25rem',
      DEFAULT: '0.5rem',
      md: '1rem',
      lg: '2rem',
      full: '9999px',
    },
    extend: {
      fontSize: {
        '2xs': '0.625rem',
      },
    },
  },
  plugins: [],
};
