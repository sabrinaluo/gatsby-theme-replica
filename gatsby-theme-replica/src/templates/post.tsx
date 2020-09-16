import { graphql } from 'gatsby';
import React, { FC } from 'react';

import Layout from '../components/Layout';
import Post from '../components/Post';
import Tag from '../components/Tag';

export const query = graphql`
  query($postID: String!) {
    post: mdx(id: { eq: $postID }) {
      body
      info: frontmatter {
        date(fromNow: true)
        title
      }
    }
  }
`;

interface Props {
  data: {
    post: {
      body: string;
      info: {
        date: string;
      };
    };
  };
}

const PostTemplate: FC<Props> = ({ data }) => {
  return (
    <Layout>
      <Tag href='about'>about</Tag>
      <Post {...data.post} />
    </Layout>
  );
};

export default PostTemplate;
