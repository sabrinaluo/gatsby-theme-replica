import { mdiCodeBraces } from '@mdi/js';
import React, { FC } from 'react';
import styled from 'styled-components';

import PageWrapper from '../../global/PageWrapper';
import NavTabItem from './NavTabItem';

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

const NavTab: FC = () => {
  return (
    <StyledWrapper>
      <PageWrapper>
        <InnerWrapper> blog name / post title</InnerWrapper>
        <TabBar>
          <NavTabItem isActive iconPath={mdiCodeBraces} count={1} text='tab1' />
        </TabBar>
      </PageWrapper>
    </StyledWrapper>
  );
};

export default NavTab;
