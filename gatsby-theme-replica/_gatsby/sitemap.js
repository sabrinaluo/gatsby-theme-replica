const options = {
  output: `/sitemap.xml`,
  // Exclude specific pages or groups of pages using glob parameters
  // See: https://github.com/isaacs/minimatch
  // The example below will exclude the single `path/to/page` and all routes beginning with `category`
  exclude: [`/404`, `/404.html`],
  query: `
        {
          site {
            siteMetadata {
              siteUrl
            }
          }
          allSitePage {
            nodes {
              path
            }
          }
      }`,
  resolveSiteUrl: ({ site }) => {
    //Alternatively, you may also pass in an environment variable (or any location) at the beginning of your `gatsby-config.js`.
    return site.siteMetadata.siteUrl;
  },
  serialize: ({ site, allSitePage }) =>
    allSitePage.nodes.map((node) => {
      return {
        url: `${site.siteMetadata.siteUrl}${node.path}`,
        changefreq: `daily`,
        priority: 0.7, //TODO
      };
    }),
};

module.exports = options;
