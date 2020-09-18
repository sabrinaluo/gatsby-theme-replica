const path = require('path');

const colors = {
  gray: {
    100: '#f6f8fa',
    light: '#e1e4e8',
    main: '#586069',
    dark: '#24292e',
  },
  orange: '#f9826c',
  blue: '#0366d6',
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
  ],
  theme: {
    extend: {
      colors,
      spacing: {
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
