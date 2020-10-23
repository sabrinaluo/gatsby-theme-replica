import { Link } from 'gatsby';
import React, { FC } from 'react';

import { TAG_DIR } from '../constants/key';
import { slugify } from '../utils/slugify';

interface TagProps {
  tag: string;
  count?: number;
}

const Tag: FC<TagProps> = ({ tag, count }) => {
  const url = `/${TAG_DIR}/${slugify(tag)}`;
  return (
    <Link to={url} className={`topic-tag`}>
      {tag} <span className={`font-semibold`}>{count}</span>
    </Link>
  );
};

export default Tag;
