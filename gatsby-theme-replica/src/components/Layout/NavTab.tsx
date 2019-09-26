import { mdiCodeBraces } from '@mdi/js';
import React, { FC } from 'react';
import styled from 'styled-components';

import Icon from '../global/Icon';
import PageWrapper from '../global/PageWrapper';

const StyledWrapper = styled.div`
  padding-top: 24px;
  margin-bottom: 24px;
  border-bottom: 1px solid #e1e4e8;
  background-color: #fafbfc;
`;

const TabBar = styled.nav`
  display: flex;
`;

const InnerWrapper = styled.div`
  margin-bottom: 20px;
`;

interface Props {
  active?: boolean;
}

const TabItem = styled.div`
  display: flex;
  align-items: center;
  color: #586069;
  padding: 10px 12px 8px 12px;
  border: 1px solid transparent;
  svg {
    margin-right: 5px;
  }
  ${(props: Props) =>
    props.active &&
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

const NavTab: FC = () => {
  return (
    <StyledWrapper>
      <PageWrapper>
        <InnerWrapper> blog name / post title</InnerWrapper>
        <TabBar>
          <TabItem active>
            <Icon path={mdiCodeBraces} size={14} /> tab1
          </TabItem>
          <TabItem>tab2</TabItem>
          <TabItem>tab3</TabItem>
        </TabBar>
      </PageWrapper>
    </StyledWrapper>
  );
};

export default NavTab;
