interface PostNode {
  id: string;
  excerpt: string;
  frontmatter: {
    date: string;
    title: string;
    tags: string[];
    category: string;
    relativeDate?: string;
  };
  fields: {
    slug: string;
  };
}

interface PostListQuery {
  nodes: PostNode[];
}
