import React, { FC } from 'react';

import { TocItem } from '../templates/post';

const TableOfContent: FC<{ items?: TocItem[]; level?: number }> = ({
  items,
  level = 0,
}) => {
  return items && items.length > 0 ? (
    <ul className={`text-sm mb-2 ${level > 0 ? 'ml-5 list-circle' : ''}`}>
      {items.map((item) => {
        const isTopLevelWithChildren = level === 0 && item.items;
        return (
          <li key={item.url}>
            <a
              href={item.url}
              className={isTopLevelWithChildren ? `text-base` : ''}
            >
              {item.title}
            </a>
            <TableOfContent items={item.items} level={level + 1} />
          </li>
        );
      })}
    </ul>
  ) : null;
};

export default TableOfContent;
