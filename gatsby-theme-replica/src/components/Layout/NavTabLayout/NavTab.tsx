import React, { FC } from 'react';
import styled from 'styled-components';

import { color } from '../../../theme';
import NavList from '../NavList';

const StyledNavList = styled(NavList)`
  a {
    padding: 8px 16px;
    color: #1b1f23;
    line-height: 30px;
    border-bottom: 2px solid transparent;
    transition: border 300ms ease-out;

    &:hover {
      border-bottom-color: ${color.gray.light};
      text-decoration: none;
    }

    > svg {
      color: ${color.gray[200]};
    }

    &.nav-item__active {
      border-bottom-color: ${color.orange};
      font-weight: bold;
      > svg {
        color: ${color.gray.dark};
      }
    }
  }

  .nav-count {
    background: rgba(209, 213, 218, 0.5);
    padding: 0 6px;
    font-size: 12px;
    border-radius: 10px;
    margin: 0 8px;
  }
`;

interface Props {
  className?: string;
  showIcon?: boolean;
}

const NavTab: FC<Props> = ({ className, showIcon }) => {
  return (
    <div className={`${className} border-b mt-6 sticky top-0 bg-white z-10`}>
      <div className={`page-grid h-12`}>
        <div className={`hidden md:block md:w-3/12 md:px-4`}></div>
        <StyledNavList
          className={`md:w-9/12 md:px-4 flex items-end overflow-x-scroll md:overflow-hidden`}
          activeClassName={`nav-item__active`}
          showCount
          showIcon={showIcon}
        />
      </div>
    </div>
  );
};

export default NavTab;
