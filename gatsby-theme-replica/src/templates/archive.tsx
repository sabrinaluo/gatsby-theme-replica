import { graphql } from 'gatsby';
import React, { FC } from 'react';

import Layout, { LayoutMode } from '../components/Layout';
import PostList from '../components/PostList';
import { PostNode } from '../types/post';

export const query = graphql`
  query PostListQuery {
    allMdx(
      filter: { slug: { ne: "README" } }
      sort: { order: DESC, fields: frontmatter___date }
    ) {
      nodes {
        id
        excerpt(pruneLength: 200)
        frontmatter {
          title
          date
          tags
        }
        fields {
          slug
        }
        slug
      }
    }
  }
`;

interface Props {
  data: {
    allMdx: {
      nodes: PostNode[];
    };
  };
}

const ArchiveTemplate: FC<Props> = ({ data }) => {
  const posts = data.allMdx.nodes;
  return (
    <Layout mode={LayoutMode.NavTab}>
      <PostList posts={posts} />
    </Layout>
  );
};

export default ArchiveTemplate;
