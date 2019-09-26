import React, { FC } from 'react';

import Index from '../global/Style';
import TopBar from './TopBar';

const BaseLayout: FC = ({ children }) => (
  <>
    <Index />
    <TopBar />
    {children}
  </>
);

export default BaseLayout;
