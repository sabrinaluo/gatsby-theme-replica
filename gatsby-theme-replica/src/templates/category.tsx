import { graphql } from 'gatsby';
import React, { FC } from 'react';

import Layout, { LayoutMode } from '../components/Layout';
import PostList from '../components/PostList';
import { PostNode } from '../types/post';

export const query = graphql`
  query CategoryPostsQuery($category: String) {
    allMdx(
      filter: {
        slug: { ne: "README" }
        frontmatter: { category: { eq: $category } }
      }
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
  pageContext: {
    category: string;
  };
  data: {
    allMdx: {
      nodes: PostNode[];
    };
  };
}

const CategoryTemplate: FC<Props> = ({ data, pageContext }) => {
  const posts = data.allMdx.nodes;
  const { category } = pageContext;
  return (
    <Layout mode={LayoutMode.NavTab}>
      <div>{category}</div>
      <PostList posts={posts} />
    </Layout>
  );
};

export default CategoryTemplate;
