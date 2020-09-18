const slugify = (str) => {
  const slug = str
    .toLowerCase()
    .replace(/[^\da-z\p{Script=Han}]+/gu, '-')
    .replace(/(^-|-$)+/g, '');
  return `${slug}`.replace(/\/\/+/g, '/');
};

module.exports = {
  slugify,
};
