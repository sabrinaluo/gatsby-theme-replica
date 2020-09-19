const fs = require('fs');
const { createFilePath } = require(`gatsby-source-filesystem`);
require('ts-node').register({ files: true });
const utils = require('./setting/utils');

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

    createNodeField({
      name: 'year',
      node,
      value: new Date(node.frontmatter.date).getFullYear(),
    });
  }
};

const pages = [
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
  // Exclude README.md, it's reserved to be a section in overview page
  const result = await graphql(`
    query {
      allMdx(
        filter: { slug: { ne: "README" } }
        sort: { fields: frontmatter___date, order: ASC }
      ) {
        nodes {
          id
          slug
          fields {
            slug
          }
        }
      }
      site {
        pathPrefix
      }

      tags: allMdx {
        group(field: frontmatter___tags) {
          fieldValue
        }
      }

      categories: allMdx {
        group(field: frontmatter___category) {
          fieldValue
        }
      }

      years: allMdx {
        group(field: fields___year) {
          fieldValue
        }
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

  try {
    const years = result.data.years.group;
    years.forEach(({ fieldValue: year }, index) => {
      actions.createPage({
        path: `${prefix}${
          index === years.length - 1 ? '/' : `/overview/${year}`
        }`,
        component: require.resolve('./src/templates/home.tsx'), //todo rename to template/overview
        context: {
          year,
        },
      });
    });
  } catch (e) {
    console.error(e);
  }

  try {
    const posts = result.data.allMdx.nodes;

    posts.forEach((post, index) => {
      actions.createPage({
        path: `${prefix}${post.fields.slug}`,
        component: require.resolve('./src/templates/post.tsx'),
        context: {
          postID: post.id,
          numericId: index + 1,
        },
      });
    });
  } catch (e) {
    console.error(e);
  }

  try {
    const tags = result.data.tags.group;
    tags.forEach((o) => {
      const slug = utils.slugify(o.fieldValue);
      actions.createPage({
        path: `${prefix}/tag/${slug}`,
        component: require.resolve('./src/templates/category.tsx'),
        context: {
          tag: o.fieldValue,
        },
      });
    });
  } catch (e) {
    console.error(e);
  }

  try {
    const categories = result.data.categories.group;
    categories.forEach((o) => {
      const slug = utils.slugify(o.fieldValue);
      actions.createPage({
        path: `${prefix}/category/${slug}`,
        component: require.resolve('./src/templates/category.tsx'),
        context: {
          category: o.fieldValue,
        },
      });
    });
  } catch (e) {
    console.error(e);
  }
};
