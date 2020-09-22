import { PostNode } from '../../types/post';

export const transformPosts = (posts: PostNode[]) =>
  posts.map(({ id, excerpt, frontmatter, fields }) => ({
    id,
    excerpt,
    title: frontmatter.title,
    tags: frontmatter.tags,
    category: frontmatter.category,
    slug: fields.slug,
    relativeDate: frontmatter.relativeDate,
    date: frontmatter.date,
  }));
