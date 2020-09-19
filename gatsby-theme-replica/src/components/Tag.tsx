import { Link } from 'gatsby';
import React, { FC } from 'react';

import { slugify } from '../../setting/utils';

interface TagProps {
  tag: string;
}

const Tag: FC<TagProps> = ({ tag }) => {
  const url = `/tag/${slugify(tag)}`;
  return (
    <Link to={url} className={`tag`}>
      {' '}
      {tag}
    </Link>
  );
};

export default Tag;
