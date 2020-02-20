import { graphql } from 'gatsby';
import React, { FC } from 'react';

import Layout, { LayoutMode } from '../components/Layout';
import Post from '../components/Post';
import Tag from '../components/Tag';

export const query = graphql`
  query($postID: String!) {
    post: markdownRemark(id: { eq: $postID }) {
      html
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
      html: string;
      info: {
        date: string;
      };
    };
  };
}

const PostTemplate: FC<Props> = ({ data }) => {
  return (
    <Layout mode={LayoutMode.NavTab}>
      <Tag href='about'>about</Tag>
      <Post {...data.post} />
    </Layout>
  );
};

export default PostTemplate;
