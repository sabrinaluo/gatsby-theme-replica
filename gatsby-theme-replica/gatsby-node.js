const fs = require('fs');
const DEFAULT_BASE_PATH = '/';
const DEFAULT_CONTENT_PATH = 'content';
// Make sure the content directory exists
exports.onPreBootstrap = ({ reporter }, options) => {
  const contentPath = options.contentPath || DEFAULT_CONTENT_PATH;

  if (!fs.existsSync(contentPath)) {
    reporter.info(`creating the ${contentPath} directory`);
    fs.mkdirSync(contentPath);
  }
};

exports.onCreateNode = () => {};

// Define the `Post` type
exports.sourceNodes = ({ actions }) => {
  actions.createTypes(`
    type Post implements Node @dontInfer {
      id: ID!
    }
  `);
};

// Define resolvers for custom fields

exports.createResolvers = ({ createResolvers }, options) => {
  const basePath = options.basePath || DEFAULT_BASE_PATH;
  // Quick-and-dirty helper to convert strings into URL-friendly slugs.
  const slugify = str => {
    const slug = str
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    return `/${basePath}/${slug}`.replace(/\/\/+/g, '/');
  };

  createResolvers({
    Query: {
      markdownRemark: {
        slug: {
          resolve: source => slugify(source.name),
        },
      },
    },
  });
};

exports.createPages = async ({ actions, graphql, reporter }, options) => {
  const basePath = options.basePath || DEFAULT_BASE_PATH;

  actions.createPage({
    path: basePath,
    component: require.resolve('./src/templates/home.tsx'),
  });

  const result = await graphql(`
    query {
      allMarkdownRemark(sort: { order: ASC, fields: frontmatter___date }) {
        nodes {
          id
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panic('error loading events', result.errors);
    return;
  }

  const posts = result.data.allMarkdownRemark.nodes;
  posts.forEach(post => {
    const slug = post.fields.slug;
    actions.createPage({
      path: slug,
      component: require.resolve('./src/templates/post.tsx'),
      context: {
        postID: post.id,
      },
    });
  });
};
