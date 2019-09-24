import React, { FC } from 'react';

import PageWrapper from '../global/PageWrapper';
import BaseLayout from './BaseLayout';

const SimpleLayoutLayout: FC = ({ children }) => {
  return (
    <BaseLayout>
      <PageWrapper>{children}</PageWrapper>
    </BaseLayout>
  );
};

export default SimpleLayoutLayout;
