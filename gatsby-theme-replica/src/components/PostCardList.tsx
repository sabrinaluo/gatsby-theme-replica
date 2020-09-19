import { graphql, useStaticQuery } from 'gatsby';
import React, { FC } from 'react';

import PostCard from './PostCard';

interface PostNode {
  id: string;
  excerpt: string;
  frontmatter: {
    title: string;
    tags: string[];
    category: string;
  };
  fields: {
    slug: string;
  };
}

interface QueryData {
  allMdx: {
    nodes: PostNode[];
  };
}

const transformPosts = (posts: PostNode[]) =>
  posts.map(({ id, excerpt, frontmatter, fields }) => ({
    id,
    excerpt,
    title: frontmatter.title,
    tagCount: frontmatter.tags.length,
    category: frontmatter.category,
    slug: fields.slug,
  }));

const PostCardList: FC = () => {
  const data = useStaticQuery<QueryData>(graphql`
    query HomePostCardList {
      allMdx(
        limit: 6
        sort: { order: DESC, fields: frontmatter___date }
        filter: { slug: { ne: "README" } }
      ) {
        nodes {
          id
          excerpt(pruneLength: 80)
          frontmatter {
            title
            tags
            category
          }
          fields {
            slug
          }
        }
      }
    }
  `);
  const posts = transformPosts(data.allMdx.nodes);

  return (
    <>
      <div>Recent Posts</div>
      <div className={`grid gap-4 grid-cols-1 md:grid-cols-2`}>
        {posts?.map((post) => (
          <PostCard {...post} />
        ))}
      </div>
    </>
  );
};

export default PostCardList;
