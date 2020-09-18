import React, { FC } from 'react';

import BaseLayout from '../BaseLayout';
import NavTab from './NavTab';

const Index: FC = ({ children }) => {
  return (
    <BaseLayout>
      <NavTab />
      {children}
    </BaseLayout>
  );
};

export default Index;
