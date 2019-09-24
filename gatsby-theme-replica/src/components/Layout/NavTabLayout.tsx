import React, { FC } from 'react';

import PageWrapper from '../global/PageWrapper';
import BaseLayout from './BaseLayout';

const NavTabLayout: FC = ({ children }) => {
  return (
    <BaseLayout>
      tab tab tab
      <PageWrapper>{children}</PageWrapper>
    </BaseLayout>
  );
};

export default NavTabLayout;
