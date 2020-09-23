module.exports = {
  siteMetadata: {
    title: `Gatsby Theme Replica - example`,
    siteUrl: 'https://www.example.com',
  },
  plugins: [
    {
      resolve: 'gatsby-theme-replica',
      options: {
        contentPath: 'content',
        basePath: '/',
      },
    },
  ],
};
