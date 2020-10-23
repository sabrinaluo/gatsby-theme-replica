import { Link } from 'gatsby';
import { CommentCount } from 'gatsby-plugin-disqus';
import React, { FC } from 'react';
import { AiOutlineTags } from 'react-icons/ai';
import { FaRegFolderOpen } from 'react-icons/fa';
import { GrBook, GrDrag } from 'react-icons/gr';
import { VscComment } from 'react-icons/vsc';
import styled from 'styled-components';

import { CATEGORY_DIR, TAG_DIR } from '../constants/key';
import useDisqus from '../hooks/useDisqus';
import { color } from '../theme';
import { BriefPost } from '../types/post';
import { slugify } from '../utils/slugify';

interface Props
  extends Required<
    Pick<
      BriefPost,
      'id' | 'slug' | 'title' | 'excerpt' | 'tags' | 'category' | 'date'
    >
  > {}

const StyledLink = styled(Link)`
  color: ${color.gray.main};
  margin-right: 16px;
  height: 21px;
  display: flex;
  align-items: center;

  &:hover {
    color: ${color.blue};
    text-decoration: none;
  }

  > svg {
    margin-right: 4px;
  }

  /* hiding disqus text, show count only */
  > span {
    word-break: break-word;
    display: block;
    width: 50px;
    overflow: hidden;
  }
`;

const PostCard: FC<Props> = ({
  id,
  slug,
  title,
  excerpt,
  category,
  tags,
  date,
}) => {
  const disqusConfig = useDisqus({
    title,
    date,
    slug,
  });

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
          <StyledLink to={`/${CATEGORY_DIR}/${slugify(category)}`}>
            <FaRegFolderOpen size={16} /> {category}
          </StyledLink>
        )}
        {tags && tags.length > 0 && (
          <StyledLink to={`/${TAG_DIR}`}>
            <AiOutlineTags size={16} />
            {tags.length}
          </StyledLink>
        )}
        {disqusConfig && (
          <StyledLink to={slug}>
            <VscComment size={16} />
            <CommentCount config={disqusConfig} placeholder={'0'} />
          </StyledLink>
        )}
      </div>
    </div>
  );
};

export default PostCard;
