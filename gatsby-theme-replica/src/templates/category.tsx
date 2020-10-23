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
      totalCount
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
      totalCount: number;
    };
  };
}

const CategoryTemplate: FC<Props> = ({ data, pageContext }) => {
  const { totalCount, nodes: posts } = data.allMdx;
  const { category } = pageContext;
  return (
    <Layout mode={LayoutMode.NavTab}>
      <div className={`text-sm border-b pb-4`}>
        <strong>{totalCount}</strong> post{totalCount > 1 ? 's' : ''} in
        category <strong>{category || 'Uncategorized'}</strong>
      </div>
      <PostList posts={posts} />
    </Layout>
  );
};

export default CategoryTemplate;
