import { Link } from 'gatsby';
import { graphql, useStaticQuery } from 'gatsby';
import React, { FC } from 'react';
import styled from 'styled-components';

import { PageKey, navTabs } from '../../../constants/nav';
import { color } from '../../../theme';

const StyledLink = styled(Link)`
  padding: 8px 16px;
  color: #1b1f23;
  line-height: 30px;
  border-bottom: 2px solid transparent;
  transition: border 300ms ease-out;

  &:hover {
    border-bottom-color: ${color.gray.light};
    text-decoration: none;
  }

  &.active {
    border-bottom-color: ${color.orange};
    font-weight: bold;
  }
`;

const StyledCount = styled.span`
  background: rgba(209, 213, 218, 0.5);
  padding: 0 6px;
  font-size: 12px;
  border-radius: 10px;
  margin: 0 8px;
`;

const NavTab: FC = () => {
  const data = useStaticQuery(graphql`
    query NavTabCount {
      allMdx {
        totalCount
      }
    }
  `);

  const postCount = data.allMdx.totalCount;
  const count: Record<any, number> = {
    [PageKey.ARCHIVES]: postCount,
  };

  return (
    <div className={`border-b mt-6 sticky top-0 bg-white flex`}>
      <div className={`page-grid h-12`}>
        <div className={`hidden md:block md:w-3/12 md:px-4`}> </div>
        <nav className={`md:w-9/12 px-4 flex items-end overflow-x-scroll`}>
          {navTabs.map((item) => (
            <StyledLink key={item.key} to={item.href} activeClassName='active'>
              {item.text}
              {count[item.key] && <StyledCount>{count[item.key]}</StyledCount>}
            </StyledLink>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default NavTab;
