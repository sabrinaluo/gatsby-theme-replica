import React, { FC } from 'react';
import styled from 'styled-components';

import Icon from '../../global/Icon';

const TabItem = styled('div')<Pick<Props, 'isActive'>>`
  display: flex;
  align-items: center;
  color: #586069;
  padding: 10px 12px 8px 12px;
  border: 1px solid transparent;
  svg {
    margin-right: 5px;
  }
  ${props =>
    props.isActive &&
    `
    padding-top: 7px;
    background-color: #fff;
    color: #24292e;
    border-top: 3px solid transparent;
    border-color: #e36209 #e1e4e8 transparent;
    border-radius: 3px 3px 0 0;
    position: relative;
    ::after{
      content: ' ';
      height: 2px;
      width:100%;
      background: #fff;
      position: absolute;
      bottom: -2px;
      left: 0;
    }
  `}
`;

const CountLabel = styled.span`
  font-weight: 600;
  font-size: 12px;
  line-height: 1;
  background-color: rgba(27, 31, 35, 0.08);
  border-radius: 20px;
  padding: 2px 4px;
`;

interface Props {
  isActive?: boolean;
  count?: number;
  iconPath: string;
  text: string;
}

const NavTabItem: FC<Props> = ({ isActive, text, count, iconPath }) => {
  return (
    <TabItem isActive={isActive}>
      <Icon path={iconPath} size={14} />
      <span>{text}</span>
      {count !== undefined && <CountLabel>{count}</CountLabel>}
    </TabItem>
  );
};

export default NavTabItem;
