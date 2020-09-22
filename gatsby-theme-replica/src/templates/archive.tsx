import { Link, graphql } from 'gatsby';
import React, { FC } from 'react';
import { FiStar } from 'react-icons/fi';

import Layout, { LayoutMode } from '../components/Layout';
import Tag from '../components/Tag';

export const query = graphql`
  query PostListQuery {
    allMdx(
      filter: { slug: { ne: "README" } }
      sort: { order: DESC, fields: frontmatter___date }
    ) {
      nodes {
        id
        excerpt(pruneLength: 200)
        frontmatter {
          title
          date
          tags
        }
        fields {
          slug
        }
        slug
      }
    }
  }
`;

interface Props {
  data: {
    allMdx: {
      nodes: PostNode[];
    };
  };
}

const ArchiveTemplate: FC<Props> = ({ data }) => {
  const posts = data.allMdx.nodes;
  return (
    <Layout mode={LayoutMode.NavTab}>
      <ul>
        {posts?.map((post) => (
          <li key={post.id} className={`py-6 border-b flex`}>
            <div className='w-10/12'>
              <h3 className='mb-1 font-semibold text-lg'>
                <Link to={post.fields.slug}>{post.frontmatter.title} </Link>
              </h3>
              <p className='my-2 text-sm text-gray-main'>{post.excerpt}</p>
              <div className={`py-1`}>
                {post.frontmatter?.tags?.map(
                  (tag) => tag && <Tag tag={tag} key={tag} />
                )}
              </div>
              <div className='text-xs text-gray-main'>
                Updated <time>{post.frontmatter.date}</time>
              </div>
            </div>
            <div className='w-2/12 flex items-center'>
              <div
                className={`text-xs px-3 py-1 border bg-gray-100 rounded-md font-semibold flex items-center`}
              >
                <FiStar size={16} />
                <span className={`pl-1`}>star</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default ArchiveTemplate;
