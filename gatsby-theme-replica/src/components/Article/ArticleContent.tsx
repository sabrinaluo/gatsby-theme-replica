import { MDXRenderer } from 'gatsby-plugin-mdx';
import React, { FC } from 'react';

export interface Props {
  body: string;
  info: {
    title: string;
    date: string;
    relativeDate: string;
    formattedDate: string;
    tags: string[];
  };
  timeToRead: number;
}

const ArticleContent: FC<Props> = ({ body }) => (
  <article className={`border-b md:border md:rounded-b-md md:px-8 md:py-4`}>
    <MDXRenderer>{body}</MDXRenderer>
  </article>
);

export default ArticleContent;
