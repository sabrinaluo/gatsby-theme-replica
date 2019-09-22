import { graphql, useStaticQuery } from 'gatsby';

import Layout from '../components/layout';
import PostList from '../components/PostList';
import React from 'react';

const HomeTemplate = () => {
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
