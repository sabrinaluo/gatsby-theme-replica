import Layout from '../components/layout';
import Post from '../components/Post';
import React from 'react';
import { graphql } from 'gatsby';

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
