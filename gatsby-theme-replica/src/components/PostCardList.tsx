import { graphql, useStaticQuery } from 'gatsby';
import React, { FC } from 'react';

import { PostNode } from '../types/post';
import { transformPosts } from '../utils/transformers/post';
import PostCard from './PostCard';

interface QueryData {
  allMdx: {
    nodes: PostNode[];
  };
}

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
            date
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
      <div className={`mb-2`}>Recent posts</div>
      <div className={`grid gap-4 grid-cols-1 md:grid-cols-2 mb-8`}>
        {posts?.map((post) => (
          <PostCard {...post} key={post.id} />
        ))}
      </div>
    </>
  );
};

export default PostCardList;
