// this file is used by both react components & gatsby-node, hence need to be .js and commonJS module
const slugify = (str) => {
  if (!str) return '';

  const slug = str
    .toLowerCase()
    .replace(/[^\da-z\p{Script=Han}]+/gu, '-')
    .replace(/(^-|-$)+/g, '');
  return `${slug}`.replace(/\/\/+/g, '/');
};

module.exports = {
  slugify,
};
