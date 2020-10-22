const DEFAULT_CONTENT_PATH = 'content';
require('ts-node').register({ files: true });
const tailwindConfig = require('./tailwind.config');
const rssFeedOption = require('./_gatsby/config/rss');
const siteMapOption = require('./_gatsby/sitemap');

module.exports = ({ contentPath = DEFAULT_CONTENT_PATH }) => ({
  siteMetadata: {
    title: `Gatsby Theme Replica`,
  },
  plugins: [
    'gatsby-plugin-postcss',
    'gatsby-plugin-typescript',
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-sitemap`,
      options: siteMapOption,
    },
    {
      resolve: 'gatsby-plugin-feed',
      options: rssFeedOption,
    },
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
      resolve: `gatsby-plugin-styled-components`,
      options: {
        displayName: process.env.NODE_ENV !== 'production',
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
