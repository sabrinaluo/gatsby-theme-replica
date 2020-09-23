import { Link } from 'gatsby';
import React, { FC } from 'react';
import styled from 'styled-components';

import { color } from '../../theme';
import { BriefPost } from '../../types/post';
import { format } from '../../utils/date';

const StyledWrapper = styled.ul`
  display: block;
  li:not(:last-child) {
    border-bottom: 1px solid ${color.gray.light};
  }
`;

interface Props {
  posts: BriefPost[];
}

const ActivityTimeline: FC<Props> = ({ posts }) => {
  return posts?.length ? (
    <StyledWrapper className={`text-sm`}>
      {posts.map((post) => (
        <li className={`py-2 flex justify-between`} key={post.id}>
          <Link to={post.slug} key={post.id}>
            {post.title}
          </Link>
          <time
            className={`text-gray-main text-xs`}
            date-time={post.date}
            title={post.date}
          >
            {format(post.date)}
          </time>
        </li>
      ))}
    </StyledWrapper>
  ) : null;
};

export default ActivityTimeline;
