const fs = require('fs');
const { createFilePath } = require(`gatsby-source-filesystem`);
require('ts-node').register({ files: true });
const { slugify } = require('./src/utils/slugify');
const { UNCATEGORIZED } = require('./src/constants/key');
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
    path: '',
    template: 'home',
  },
  {
    path: 'category',
    template: 'categories',
  },
  {
    path: 'archives',
    template: 'archive',
  },
  {
    path: 'tag',
    template: 'tags',
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
          frontmatter {
            title
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
      uncategorized: allMdx(
        filter: { frontmatter: { category: { eq: null } } }
      ) {
        totalCount
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
      component: require.resolve(`./src/templates/${page.template}.tsx`),
    });
  });

  const posts = result.data.allMdx.nodes;
  const tags = result.data.tags.group;
  const categories = result.data.categories.group;
  const uncategorized = result.data.uncategorized;

  try {
    posts.forEach((post, index) => {
      const prev = posts[index - 1];
      const next = posts[index + 1];
      const prevPost = prev
        ? {
            slug: prev.fields.slug,
            title: prev.frontmatter.title,
          }
        : null;

      const nextPost = next
        ? {
            slug: next.fields.slug,
            title: next.frontmatter.title,
          }
        : null;

      actions.createPage({
        path: `${prefix}${post.fields.slug}`,
        component: require.resolve('./src/templates/post.tsx'),
        context: {
          postID: post.id,
          numericId: index + 1,
          prevPost,
          nextPost,
        },
      });
    });
  } catch (e) {
    console.error(e);
  }

  // todo ignore case
  try {
    tags.forEach((o) => {
      const slug = slugify(o.fieldValue);
      actions.createPage({
        path: `${prefix}/tag/${slug}`,
        component: require.resolve('./src/templates/tag.tsx'),
        context: {
          tag: o.fieldValue,
        },
      });
    });
  } catch (e) {
    console.error(e);
  }

  // todo ignore case
  try {
    categories.forEach((o) => {
      const slug = slugify(o.fieldValue);
      actions.createPage({
        path: `${prefix}/category/${slug}`,
        component: require.resolve('./src/templates/category.tsx'),
        context: {
          category: o.fieldValue,
        },
      });
    });

    if (uncategorized.totalCount > 0) {
      actions.createPage({
        path: `${prefix}/category/${UNCATEGORIZED}`,
        component: require.resolve('./src/templates/category.tsx'),
        context: {
          category: null,
        },
      });
    }
  } catch (e) {
    console.error(e);
  }
};
