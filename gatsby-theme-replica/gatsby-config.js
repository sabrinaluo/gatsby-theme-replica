const DEFAULT_CONTENT_PATH = 'content';
require('ts-node').register({ files: true });
const tailwindConfig = require('./tailwind.config');

module.exports = ({ contentPath = DEFAULT_CONTENT_PATH }) => ({
  siteMetadata: {
    title: `Title from siteMetadata 111`,
  },
  plugins: [
    'gatsby-plugin-postcss',
    'gatsby-plugin-typescript',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: contentPath,
      },
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: [`.mdx`, `.md`],
      },
    },
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        color: tailwindConfig.theme.extend.colors.blue.default,
        showSpinner: false,
      },
    },
  ],
});
