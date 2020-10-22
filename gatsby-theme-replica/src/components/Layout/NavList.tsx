import { Link } from 'gatsby';
import React, { FC } from 'react';

import { navTabs } from '../../constants/nav';
import useConfig from '../../hooks/useConfig';
import useTotal from '../../hooks/useTotal';

interface Props {
  className?: string;
  itemClassName?: string;
  activeClassName?: string;
  showCount?: boolean;
}

const NavList: FC<Props> = ({
  className = '',
  itemClassName = '',
  activeClassName = '',
  showCount,
}) => {
  const total = useTotal();
  const config = useConfig();

  return (
    <div className={className}>
      {navTabs.map((item) => {
        const { openInNewTab, text, href } = item;
        // @ts-ignore
        const count = total[item.countKey];

        return openInNewTab ? (
          <a href={href} key={text} className={itemClassName} target='_blank'>
            {text}
          </a>
        ) : (
          <Link
            key={text}
            className={itemClassName}
            to={href}
            activeClassName={activeClassName}
          >
            <span>{text}</span>
            {showCount && count !== undefined && (
              <span className={`nav-count`}>{count}</span>
            )}
          </Link>
        );
      })}
      <Link
        to={'/'}
        className={`py-2 text-white hover:no-underline flex md:hidden items-center border-t-fade-white15`}
      >
        <img src={config.avatar} className={`rounded-full mr-2`} width={20} />
        {config.author}
      </Link>
    </div>
  );
};

export default NavList;
