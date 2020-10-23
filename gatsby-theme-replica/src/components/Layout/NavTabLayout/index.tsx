import React, { FC } from 'react';

import Profile from '../../Profile';
import BaseLayout from '../BaseLayout';
import NavTab from './NavTab';

const Index: FC = ({ children }) => {
  return (
    <BaseLayout>
      <NavTab className={`hidden md:flex`} showIcon />
      <div className={`page-grid flex flex-wrap md:flex-row`}>
        <Profile />

        <div className={`w-full md:w-9/12 md:px-4 pt-6`}>{children}</div>
      </div>
    </BaseLayout>
  );
};

export default Index;
