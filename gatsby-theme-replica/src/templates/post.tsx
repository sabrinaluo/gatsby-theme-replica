import { graphql } from 'gatsby';
import React, { FC } from 'react';

import Layout from '../components/Layout';
import Post from '../components/Post';

export const query = graphql`
  query($postID: String!) {
    markdownRemark(id: { eq: $postID }) {
      id
      html
    }
  }
`;

interface Props {
  data: any;
}

const PostTemplate: FC<Props> = data => {
  return (
    <Layout>
      <Post {...data.data.markdownRemark} />
    </Layout>
  );
};

export default PostTemplate;
