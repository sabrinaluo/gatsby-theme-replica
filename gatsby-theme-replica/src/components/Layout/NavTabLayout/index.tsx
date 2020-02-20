import React, { FC } from 'react';

import PageWrapper from '../../global/PageWrapper';
import BaseLayout from '../BaseLayout';
import NavTab from './NavTab';

const Index: FC = ({ children }) => {
  return (
    <BaseLayout>
      <NavTab />
      <PageWrapper>{children}</PageWrapper>
    </BaseLayout>
  );
};

export default Index;
