import { Link, graphql, useStaticQuery } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import React, { FC } from 'react';
import { VscSmiley } from 'react-icons/vsc';

import useConfig from '../hooks/useConfig';

const ReadMe: FC = () => {
  const data = useStaticQuery(graphql`
    query README {
      mdx(slug: { eq: "README" }) {
        body
      }
    }
  `);

  const body = data.mdx?.body;
  const config = useConfig();
  return body ? (
    <div className={`border rounded-md p-6 mb-6 w-full`}>
      <div className={`flex items-center text-xs mb-4 text-mono`}>
        <VscSmiley size={18} />
        <Link
          to={'/'}
          className={`ml-1 text-gray-dark no-underscore hover:text-blue`}
        >
          {config.author}
        </Link>
        <span className={`px-2px`}>/</span>README.
        <span className={`text-gray-main`}>md</span>
      </div>
      <MDXRenderer>{body}</MDXRenderer>
    </div>
  ) : null;
};

export default ReadMe;
//TODO typography
