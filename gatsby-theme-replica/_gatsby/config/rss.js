const { RSS_FILENAME } = require('../../src/constants/key');
const query = `
{
  site {
    siteMetadata {
      title
      description
      siteUrl
      site_url: siteUrl
    }
  }
}
        `;

const feedQuery = `
{
  allMdx(
    filter: { slug: { ne: "README" } },
    sort: { order: DESC, fields: [frontmatter___date] },
  ) {
    edges {
      node {
        excerpt
        html
        fields { slug }
        frontmatter {
          title
          date
        }
      }
    }
  }
}
            `;

const feeds = [
  {
    serialize: ({ query: { site, allMdx } }) => {
      return allMdx.edges.map((edge) => {
        return Object.assign({}, edge.node.frontmatter, {
          description: edge.node.excerpt,
          date: edge.node.frontmatter.date,
          url: site.siteMetadata.siteUrl + edge.node.fields.slug,
          guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
          custom_elements: [{ 'content:encoded': edge.node.html }],
        });
      });
    },
    query: feedQuery,
    output: `/${RSS_FILENAME}`,
    title: `RSS Feed`,
    // optional configuration to insert feed reference in pages:
    // if `string` is used, it will be used to create RegExp and then test if pathname of
    // current page satisfied this regular expression;
    // if not provided or `undefined`, all pages will have feed reference inserted
    match: '^/post/',
  },
];

module.exports = {
  query,
  feeds,
};
