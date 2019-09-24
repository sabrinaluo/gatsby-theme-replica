import React, { FC } from 'react';

import TopBar from './TopBar';

const BaseLayout: FC = ({ children }) => (
  <div>
    <TopBar />
    {children}
  </div>
);

export default BaseLayout;
