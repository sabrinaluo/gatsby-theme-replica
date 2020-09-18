import React, { FC } from 'react';

import PostCard, { Props as PostProps } from './PostCard';

export interface Props {
  posts: PostProps[];
}

const PostList: FC<Props> = ({ posts }) => (
  <>
    <div className={`mt-6`}>Pinned</div>
    <div className={`grid gap-4 grid-cols-1 md:grid-cols-2`}>
      {posts?.map((post) => (
        <PostCard {...post} />
      ))}
    </div>
  </>
);

export default PostList;
