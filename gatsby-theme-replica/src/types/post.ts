import { TocItem } from '../templates/post';

export interface PostNode {
  id: string;
  excerpt: string;
  body: string;
  frontmatter: {
    date: string;
    title: string;
    tags: string[];
    category: string;
    relativeDate?: string;
    formattedDate?: string;
  };
  fields: {
    slug: string;
  };
  timeToRead: number;
  tableOfContents: {
    items?: TocItem[];
  };
}

export interface PostListQuery {
  nodes: PostNode[];
}

export interface BriefPost {
  id: string;
  excerpt?: string;
  date: string;
  title: string;
  tags?: string[];
  category?: string;
  relativeDate?: string;
  formattedDate?: string;
  slug: string;
}
