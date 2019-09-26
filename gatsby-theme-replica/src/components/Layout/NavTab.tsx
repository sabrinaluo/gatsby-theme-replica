import React, { FC } from 'react';
import styled from 'styled-components';

import PageWrapper from '../global/PageWrapper';

const StyledWrapper = styled.div`
  padding-top: 24px;
  margin-bottom: 24px;
  border-bottom: 1px solid #e1e4e8;
  background-color: #fafbfc;
`;

const TabBar = styled.div``;

const InnerWrapper = styled.div`
  margin-bottom: 20px;
`;

const NavTab: FC = () => {
  return (
    <StyledWrapper>
      <PageWrapper>
        <InnerWrapper> text text </InnerWrapper>
        <TabBar>tabtab</TabBar>
      </PageWrapper>
    </StyledWrapper>
  );
};

export default NavTab;
