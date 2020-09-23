import { PostNode } from '../../types/post';
import { getRelativeTimeFromNow } from '../date';

export const transformPosts = (posts: PostNode[]) =>
  posts.map(({ id, excerpt, frontmatter, fields }) => ({
    id,
    excerpt,
    title: frontmatter.title,
    tags: frontmatter.tags,
    category: frontmatter.category,
    slug: fields.slug,
    relativeDate: getRelativeTimeFromNow(frontmatter.date),
    date: frontmatter.date,
  }));
