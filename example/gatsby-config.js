module.exports = {
  siteMetadata: {
    title: `Gatsby Theme Replica - example`,
    siteUrl: 'https://www.example.com',
  },
  plugins: [
    {
      resolve: `gatsby-plugin-disqus`,
      options: {
        shortname: `hiitea-tech`,
      },
    },
    {
      resolve: 'gatsby-theme-replica',
      options: {
        contentPath: 'content',
      },
    },
  ],
};
