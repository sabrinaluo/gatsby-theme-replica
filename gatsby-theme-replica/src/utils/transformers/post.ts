export const transformPosts = (posts: PostNode[]) =>
  posts.map(({ id, excerpt, frontmatter, fields }) => ({
    id,
    excerpt,
    title: frontmatter.title,
    tagCount: frontmatter.tags.length,
    category: frontmatter.category,
    slug: fields.slug,
  }));
