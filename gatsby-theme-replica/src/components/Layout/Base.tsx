import React from 'react';

import TopBar from './TopBar';

const BaseLayout = ({ children }) => (
  <div>
    <TopBar />
    {children}
  </div>
);

export default BaseLayout;
