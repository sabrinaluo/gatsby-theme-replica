import { graphql } from 'gatsby';
import React, { FC } from 'react';

import config from '../../_config';
import ArticleContent from '../components/Article/ArticleContent';
import ArticleTitle from '../components/Article/ArticleTitle';
import AuthorBar from '../components/Article/AuthorBar';
import Layout from '../components/Layout';
import TableOfContent from '../components/TableOfContent';
import Tag from '../components/Tag';
import { PostNode } from '../types/post';

export interface TocItem {
  url: string;
  title: string;
  items?: TocItem[];
}

interface Props {
  pageContext: {
    numericId: number;
  };
  data: {
    post: PostNode;
  };
}

const PostTemplate: FC<Props> = ({ data, pageContext }) => {
  const {
    title,
    date,
    relativeDate,
    tags,
    formattedDate,
  } = data.post.frontmatter;
  const { timeToRead, tableOfContents, body } = data.post;
  const { numericId } = pageContext;

  return (
    <Layout>
      <div className={`page-grid mt-4 md:px-8`}>
        <ArticleTitle
          title={title}
          numericId={numericId}
          relativeDate={relativeDate as string}
          timeToRead={timeToRead}
        />
        <div className={`w-full md:w-9/12 md:pr-4 md:border-b-0 mb-4`}>
          <div className={`relative`}>
            <img
              src={config.avatar}
              className={`hidden md:block border rounded-full absolute`}
              width={40}
            />
            <div className={`md:ml-14`}>
              <AuthorBar
                dateTime={date}
                formattedDate={formattedDate as string}
              />
              <ArticleContent body={body} />
            </div>
          </div>
        </div>
        <div className={`w-full md:w-3/12 md:pl-4`}>
          <div className={`pb-4 border-b`}>
            <h2 className={`mb-4 font-medium`}>About</h2>
            <div>{tags.map((tag) => tag && <Tag tag={tag} key={tag} />)}</div>
          </div>
          {tableOfContents.items && (
            <div className={`pb-4 border-b sticky top-0`}>
              <h2 className={`my-4 font-medium`}>Table of Content</h2>
              <TableOfContent items={tableOfContents.items} />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query($postID: String!) {
    post: mdx(id: { eq: $postID }) {
      body
      frontmatter {
        relativeDate: date(fromNow: true)
        formattedDate: date(formatString: "MMM d, YYYY")
        date
        title
        tags
      }
      tableOfContents(maxDepth: 3)
      timeToRead
      slug
    }
  }
`;

export default PostTemplate;
