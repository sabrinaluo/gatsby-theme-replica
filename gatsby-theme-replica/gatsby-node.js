const fs = require('fs');
const { createFilePath } = require(`gatsby-source-filesystem`);
require('ts-node').register({ files: true });

const DEFAULT_CONTENT_PATH = 'content';

// Make sure the content directory exists
exports.onPreBootstrap = ({ reporter }, options) => {
  const contentPath = options.contentPath || DEFAULT_CONTENT_PATH;

  if (!fs.existsSync(contentPath)) {
    reporter.info(`creating the ${contentPath} directory`);
    fs.mkdirSync(contentPath);
  }
};

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === 'Mdx') {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: 'slug',
      node,
      value: `/post${value}`,
    });
  }
};

const pages = [
  {
    path: '',
    component: 'home',
  },
  {
    path: 'categories',
    component: 'category',
  },
  {
    path: 'archives',
    component: 'archive',
  },
];

const trimTailingSlash = (str) => {
  const hasTailingSlash = str.slice(-1) === '/';
  return hasTailingSlash ? str.slice(0, -1) : str;
};

exports.createPages = async ({ actions, graphql, reporter }) => {
  const result = await graphql(`
    query {
      allMdx {
        nodes {
          id
          fields {
            slug
          }
        }
      }
      site {
        pathPrefix
      }
    }
  `);

  if (result.errors) {
    reporter.panic('error loading events', result.errors);
    return;
  }

  const prefix = trimTailingSlash(result.data.site.pathPrefix);

  pages.forEach((page) => {
    actions.createPage({
      path: `${prefix}/${page.path}`,
      component: require.resolve(`./src/templates/${page.component}.tsx`),
    });
  });

  const posts = result.data.allMdx.nodes;
  posts.forEach((post) => {
    actions.createPage({
      path: `${prefix}${post.fields.slug}`,
      component: require.resolve('./src/templates/post.tsx'),
      context: {
        postID: post.id,
      },
    });
  });
};
