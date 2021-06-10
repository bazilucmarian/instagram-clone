module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
  },
  purge: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './layout/**/*.{js,ts,jsx,tsx}',
    './helpers/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    fill: (theme) => ({
      red: theme('colors.red.primary'),
    }),

    colors: {
      white: '#ffffff',
      blue: {
        medium: '#005c98',
      },
      black: {
        light: '#262626',
        faded: '#00000059',
      },
      gray: {
        base: '#616161',
        background: '#fafafa',
        primary: '#dbdbdb',
      },
      red: {
        primary: '#ed4956',
      },
    },
  },
  variants: {
    display: ['group-hover'],
  },

  plugins: [],
};
