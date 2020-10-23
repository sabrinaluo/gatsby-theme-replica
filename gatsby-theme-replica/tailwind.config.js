const path = require('path');

const colors = {
  fade: {
    white15: 'hsla(0,0%,100%,.15)',
  },
  gray: {
    50: '#fafbfc',
    100: '#f6f8fa',
    120: '#ebedf0',
    150: '#c6cbd1',
    200: '#959da5',
    300: '#6a737d',
    light: '#e1e4e8',
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
  yellow: {
    light: '#fff5b1',
    default: '#f9c513',
  },
  hotpink: '#FF69B4',
  green: {
    main: '#2ea44f',
    superlight: '#9be9a8',
    light: '#40c463',
    medium: '#30a14e',
    dark: '#216e39',
  },
};

module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
    defaultLineHeights: true,
    standardFontWeights: true,
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
        '3px': '3px',
        '60px': '60px',
        '64px': '64px',
      },
      inset: {
        '-4px': '-4px',
        '-2px': '-2px',
        1: '0.25rem',
        '8px': '8px',
        '10px': '10px',
        '74px': '74px',
      },
      listStyleType: {
        circle: 'circle',
      },
      fontSize: {
        '11px': '11px',
        '26px': '26px',
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
