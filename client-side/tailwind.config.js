module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
    screens: {
      xs: '576px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    extend: {
      colors: {
        primary: {
          default: '#0ad878',
          light: '#92fac9',
          dark: '#08a75d'
        },
        secondary: {
          default: '#808e9b',
          light: '#e9ebed',
          dark: '#48525c'
        }
      },
    }
  },
  variants: {},
  plugins: [],
}


