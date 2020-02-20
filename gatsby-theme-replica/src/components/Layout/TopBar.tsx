import React, { FC } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 32px;
  padding: 16px;
  background-color: rgb(36, 41, 46);
  color: rgba(255, 255, 255, 0.7);
  display: flex;
  align-items: center;
`;

const InnerWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
`;

const NavList = styled.ul`
  list-style: none;
  display: flex;
  font-weight: 600;
  color: #fff;

  li {
    margin-right: 16px;
  }
`;

const IconList = styled.ul`
  list-style: none;
  display: flex;
  font-weight: 600;
  color: #fff;

  li {
    margin-right: 16px;
  }

  li:last-child {
    margin-right: 0;
  }
`;

const TopBar: FC = () => (
  <Wrapper>
    <div>icon</div>
    <InnerWrapper>
      <input />
      <NavList>
        <li>1234</li>
        <li>1234</li>
        <li>1234</li>
      </NavList>
    </InnerWrapper>
    <IconList>
      <li>noti</li>
      <li>add</li>
      <li>avatar</li>
    </IconList>
  </Wrapper>
);

export default TopBar;
