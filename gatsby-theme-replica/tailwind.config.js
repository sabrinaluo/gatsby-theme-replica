const path = require('path');

const colors = {
  gray: {
    50: '#fafbfc',
    100: '#f6f8fa',
    light: '#e1e4e8',
    150: '#c6cbd1',
    200: '#959da5',
    300: '#6a737d',
    medium: '#767676',
    main: '#586069',
    dark: '#24292e',
  },
  orange: '#f9826c',
  blue: {
    100: '#f1f8ff',
    150: '#def',
    light: '#c8e1ff',
    default: '#0366d6',
  },
  hotpink: '#FF69B4',
};

module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: [
    path.resolve(__dirname, './src/**/*.tsx'),
    path.resolve(__dirname, './src/**/*.css'),
    path.resolve(__dirname, './gatsby-browser.js'),
  ],
  theme: {
    extend: {
      colors,
      borderColor: {
        ...colors,
        default: colors.gray.light,
      },
      spacing: {
        14: '3.5rem',
        '2px': '2px',
        '60px': '60px',
        '74px': '74px',
      },
      inset: {
        1: '0.25rem',
      },
    },
  },
  variants: {
    backgroundColor: ['hover'],
    textColor: ['hover'],
    width: ['responsive', 'focus'],
  },
  plugins: [],
};
