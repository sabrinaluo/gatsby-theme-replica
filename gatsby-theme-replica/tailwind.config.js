const path = require('path');

module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
  },
  purge: [path.resolve(__dirname, './src/**/*.tsx')],
  theme: {
    extend: {
      color: {
        gray: '#e1e4e8',
      },
    },
  },
  variants: {},
  plugins: [],
};
