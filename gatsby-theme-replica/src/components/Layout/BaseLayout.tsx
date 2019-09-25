import normalize from 'normalize.css';
import React, { FC } from 'react';
import { createGlobalStyle } from 'styled-components';

import TopBar from './TopBar';

const GlobalStyle = createGlobalStyle`
  ${normalize}
`;

const BaseLayout: FC = ({ children }) => (
  <>
    <GlobalStyle />
    <TopBar />
    {children}
  </>
);

export default BaseLayout;
