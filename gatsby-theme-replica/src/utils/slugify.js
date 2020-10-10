// this file is used by both react components & gatsby-node, hence need to be .js and commonJS module
const slugger = require('github-slugger');

const slugify = (str) => {
  if (!str) return '';

  // assume no duplicate id in the same article
  return new slugger().slug(str);
};

module.exports = {
  slugify,
};
