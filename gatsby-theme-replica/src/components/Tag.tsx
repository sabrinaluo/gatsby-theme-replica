import React, { FC } from 'react';
import styled from 'styled-components';

interface TagProps {
  href: string;
  children: string;
}

const Wrapper = styled.a`
  display: inline-box;
  padding: 4px 11px;
  background-color: rgb(241, 248, 255);
  border-radius: 3px;
  &:hover {
    background-color: rgb(221, 238, 255);
  }
`;

const Tag: FC<TagProps> = ({ children, href }) => {
  return <Wrapper href={href}>{children}</Wrapper>;
};

export default Tag;
