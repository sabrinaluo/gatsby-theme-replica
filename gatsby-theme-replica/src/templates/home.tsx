import { graphql } from 'gatsby';
import React, { FC } from 'react';

import Layout from '../components/Layout';
import PostList from '../components/PostList';

export const query = graphql`
  query HomepageQuery {
    allMdx(limit: 6, sort: { order: DESC, fields: frontmatter___date }) {
      nodes {
        id
        excerpt(pruneLength: 80)
        frontmatter {
          title
        }
        fields {
          slug
        }
      }
    }
  }
`;

interface Props {
  data: {
    allMdx: {
      nodes: any[];
    };
  };
}

const HomeTemplate: FC<Props> = ({ data }) => {
  const posts = data.allMdx.nodes;
  return (
    <Layout>
      <PostList posts={posts} />
    </Layout>
  );
};

export default HomeTemplate;
