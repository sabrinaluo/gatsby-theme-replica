import React, { FC } from 'react';

interface Props {
  html: string;
  info: {
    date: string;
  };
}

const Post: FC<Props> = ({ html, info }) => (
  <div>
    {info.date}
    <div dangerouslySetInnerHTML={{ __html: html }} />
  </div>
);

export default Post;
