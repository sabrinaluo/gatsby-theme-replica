import { MDXRenderer } from 'gatsby-plugin-mdx';
import React, { FC } from 'react';

interface Props {
  body: string;
  info: {
    date: string;
  };
}

const Post: FC<Props> = ({ body, info }) => (
  <article>
    {info.date}
    <MDXRenderer>{body}</MDXRenderer>
  </article>
);

export default Post;
