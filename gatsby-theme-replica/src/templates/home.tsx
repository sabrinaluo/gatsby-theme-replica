import { graphql, useStaticQuery } from 'gatsby';
import React, { FC } from 'react';

import Layout from '../components/Layout';
import PostList from '../components/PostList';

const HomeTemplate: FC = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(sort: { order: ASC, fields: frontmatter___date }) {
        nodes {
          id
          fields {
            slug
          }
          frontmatter {
            title
            date
          }
        }
      }
    }
  `);

  const posts = data.allMarkdownRemark.nodes;

  return (
    <Layout>
      <div>home page</div>
      <PostList posts={posts} />
    </Layout>
  );
};

export default HomeTemplate;
