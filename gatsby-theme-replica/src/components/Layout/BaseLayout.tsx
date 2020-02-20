import React, { FC } from 'react';
import { Helmet } from 'react-helmet';

import GlobalStyle from '../global/Style';
import Footer from './Footer';
import TopBar from './TopBar';

const BaseLayout: FC = ({ children }) => (
  <>
    <GlobalStyle />
    <Helmet>
      <title>My Title</title>
      <link rel='canonical' href='http://mysite.com/example' />
    </Helmet>
    <TopBar />
    {children}
    <Footer />
  </>
);

export default BaseLayout;
