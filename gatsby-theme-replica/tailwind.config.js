const path = require('path');

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
      color: {
        gray: {
          default: '#e1e4e8',
          main: '#586069',
          dark: '#24292e',
        },
        orange: '#f9826c',
        blue: '#0366d6',
        hotpink: '#FF69B4',
      },
    },
  },
  variants: {},
  plugins: [],
};
