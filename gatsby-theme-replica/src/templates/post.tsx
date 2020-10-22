import { graphql } from 'gatsby';
import { Link } from 'gatsby';
import { Disqus } from 'gatsby-plugin-disqus';
import React, { FC } from 'react';
import { Helmet } from 'react-helmet';
import { FaRegFolderOpen } from 'react-icons/fa';

import ArticleContent from '../components/Article/ArticleContent';
import ArticleTitle from '../components/Article/ArticleTitle';
import AuthorBar from '../components/Article/AuthorBar';
import Layout from '../components/Layout';
import TableOfContent from '../components/TableOfContent';
import Tag from '../components/Tag';
import useConfig from '../hooks/useConfig';
import useDisqus from '../hooks/useDisqus';
import { PostNode } from '../types/post';
import { format, getRelativeTimeFromNow } from '../utils/date';
import { slugify } from '../utils/slugify';

export interface TocItem {
  url: string;
  title: string;
  items?: TocItem[];
}

interface RelatedPost {
  slug: string;
  title: string;
}
interface Props {
  pageContext: {
    numericId: number;
    prevPost?: RelatedPost;
    nextPost?: RelatedPost;
  };
  data: {
    post: PostNode;
  };
}

const PostTemplate: FC<Props> = ({ data, pageContext }) => {
  const config = useConfig();
  const { title, date, tags, category } = data.post.frontmatter;
  const { timeToRead, tableOfContents, body, excerpt } = data.post;
  const { numericId, prevPost, nextPost } = pageContext;
  const { slug } = data.post.fields;

  const relativeDate = getRelativeTimeFromNow(date);
  const formattedDate = format(date);
  const canonicalUrl = `${config.siteUrl}${slug}`;

  const disqusConfig = useDisqus({
    title,
    date,
    slug,
  });

  return (
    <Layout>
      <Helmet>
        <title>
          {title} - {config.siteName}
        </title>
        <meta name='description' content={excerpt} />
        {tags && tags.length > 0 && (
          <meta name='keywords' content={tags.join(',')} />
        )}
        <link rel='canonical' href={canonicalUrl} />
      </Helmet>
      <Helmet>
        <title>
          {title} - {config.siteName}
        </title>
        <link rel='canonical' href={slug} />
      </Helmet>
      <div className={`page-grid mt-4 md:px-8`}>
        <ArticleTitle
          title={title}
          numericId={numericId}
          relativeDate={relativeDate}
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
              <AuthorBar dateTime={date} formattedDate={formattedDate} />
              <ArticleContent body={body} />
              {disqusConfig && <Disqus config={disqusConfig} />}
            </div>
          </div>
          <div
            className={`flex py-2 text-xs flex-wrap justify-between items-center ml:0 md:ml-14`}
          >
            {prevPost && (
              <div>
                <span className={`mr-1 text-gray-medium`}>←</span>
                <Link to={prevPost.slug}> {prevPost.title}</Link>
              </div>
            )}
            {nextPost && (
              <div>
                <Link to={nextPost.slug}>{nextPost.title}</Link>
                <span className={`ml-1 text-gray-medium`}>→</span>
              </div>
            )}
          </div>
        </div>
        <div className={`w-full md:w-3/12 md:pl-4`}>
          <div className={`pb-4 border-b`}>
            <h2 className={`mb-4 font-medium`}>About</h2>
            {category && (
              <Link
                to={`/category/${slugify(category)}`}
                className={`flex items-center text-gray-medium hover:text-blue hover:no-underline mb-4`}
              >
                <FaRegFolderOpen />
                <span className={`ml-3 text-sm`}>{category}</span>
              </Link>
            )}
            {tags && tags.length > 0 && (
              <div>{tags.map((tag) => tag && <Tag tag={tag} key={tag} />)}</div>
            )}
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
      excerpt(pruneLength: 100)
      fields {
        slug
      }
      frontmatter {
        date
        title
        tags
        category
      }
      tableOfContents(maxDepth: 3)
      timeToRead
    }
  }
`;

export default PostTemplate;
