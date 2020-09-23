import { Link } from 'gatsby';
import React, { FC } from 'react';
import { FiStar } from 'react-icons/fi';

import { PostNode } from '../types/post';
import { getDateString } from '../utils/date';
import Tag from './Tag';

interface Props {
  posts: PostNode[];
}

const PostList: FC<Props> = ({ posts }) => {
  return (
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
              Posted on{' '}
              <time data-date={post.frontmatter.date}>
                {getDateString(post.frontmatter.date)}
              </time>
            </div>
          </div>
          <div className='w-2/12 flex items-center justify-end'>
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
  );
};

export default PostList;
