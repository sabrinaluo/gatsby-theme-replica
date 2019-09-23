import { graphql } from 'gatsby';
import React from 'react';

import Layout from '../components/layout';
import Post from '../components/Post';

export const query = graphql`
  query($postID: String!) {
    markdownRemark(id: { eq: $postID }) {
      id
      html
    }
  }
`;

const PostTemplate = data => {
  console.log(data);
  return (
    <Layout>
      <Post {...data.data.markdownRemark} />
    </Layout>
  );
};

export default PostTemplate;
