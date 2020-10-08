import { Link } from 'gatsby';
import React, { FC } from 'react';
import { AiOutlineTags } from 'react-icons/ai';
import { FaRegFolderOpen } from 'react-icons/fa';
import { GrBook, GrDrag } from 'react-icons/gr';
import styled from 'styled-components';

import { color } from '../theme';
import { BriefPost } from '../types/post';
import { slugify } from '../utils/slugify';

interface Props
  extends Required<
    Pick<BriefPost, 'id' | 'slug' | 'title' | 'excerpt' | 'tags' | 'category'>
  > {}

const StyledLink = styled(Link)`
  color: ${color.gray.main};
  margin-right: 16px;

  &:hover {
    color: ${color.blue};
    text-decoration: none;
  }

  > svg {
    display: inline;
  }
`;

const PostCard: FC<Props> = ({ id, slug, title, excerpt, category, tags }) => {
  return (
    <div className={`border rounded-md p-4 flex flex-col text-sm`} key={id}>
      <div className={`flex items-center`}>
        <GrBook size={16} className={`mr-2`} />
        <Link to={slug} className={`flex-grow`}>
          {title}
        </Link>
        <GrDrag size={16} className={`cursor-pointer`} />
      </div>
      <div className={`flex-grow mt-2 mb-4 text-gray-main`}>{excerpt}</div>
      <div className={`flex items-center`}>
        {category && (
          <StyledLink to={`/category/${slugify(category)}`}>
            <FaRegFolderOpen size={16} /> {category}
          </StyledLink>
        )}
        {tags?.length > 0 && (
          <StyledLink to={`/tag`}>
            <AiOutlineTags size={16} /> {tags.length}{' '}
          </StyledLink>
        )}
      </div>
    </div>
  );
};

export default PostCard;
