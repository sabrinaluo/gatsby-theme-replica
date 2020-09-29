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
    };
  };
}

const TagTemplate: FC<Props> = ({ pageContext, data }) => {
  const { tag } = pageContext;
  const posts = data.allMdx.nodes;
  return (
    <Layout mode={LayoutMode.NavTab}>
      <div>
        <Tag tag={tag} />
      </div>
      <PostList posts={posts} />
    </Layout>
  );
};

export default TagTemplate;
