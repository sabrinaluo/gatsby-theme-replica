import React, { FC } from 'react';

import GlobalStyle from '../global/Style';
import TopBar from './TopBar';

const BaseLayout: FC = ({ children }) => (
  <>
    <GlobalStyle />
    <TopBar />
    {children}
  </>
);

export default BaseLayout;
