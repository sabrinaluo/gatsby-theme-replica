const DEFAULT_CONTENT_PATH = 'content';

module.exports = ({ contentPath = DEFAULT_CONTENT_PATH }) => ({
  siteMetadata: {
    title: `Title from siteMetadata 111`,
  },
  plugins: [
    `gatsby-plugin-sass`,
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
      resolve: `gatsby-transformer-remark`,
      options: {
        commonmark: true,
        footnotes: true,
        pedantic: true,
        gfm: true,
        plugins: [],
      },
    },
  ],
});
