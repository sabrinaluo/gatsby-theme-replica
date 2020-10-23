import { graphql } from 'gatsby';
import React, { FC } from 'react';

import Layout, { LayoutMode } from '../components/Layout';
import PostList from '../components/PostList';
import Tag from '../components/Tag';
import { PostNode } from '../types/post';

export const query = graphql`
  query TagPostsQuery($tag: String!) {
    allMdx(
      filter: { slug: { ne: "README" }, frontmatter: { tags: { eq: $tag } } }
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
    tag: string;
  };
  data: {
    allMdx: {
      nodes: PostNode[];
      totalCount: number;
    };
  };
}

const TagTemplate: FC<Props> = ({ pageContext, data }) => {
  const { tag } = pageContext;
  const { totalCount, nodes: posts } = data.allMdx;
  return (
    <Layout mode={LayoutMode.NavTab}>
      <div className={`text-sm border-b pb-4`}>
        <strong>{totalCount}</strong> post{totalCount > 1 ? 's' : ''} in tag{' '}
        <Tag tag={tag} />
      </div>
      <PostList posts={posts} />
    </Layout>
  );
};

export default TagTemplate;
