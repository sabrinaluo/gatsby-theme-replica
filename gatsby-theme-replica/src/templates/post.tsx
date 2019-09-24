import { graphql } from 'gatsby';
import React, { FC } from 'react';

import Layout, { LayoutMode } from '../components/Layout';
import Post from '../components/Post';

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

//todo [2019-10-01]  meta data
const PostTemplate: FC<Props> = ({ data }) => {
  return (
    <Layout mode={LayoutMode.NavTab}>
      <Post {...data.post} />
    </Layout>
  );
};

export default PostTemplate;
