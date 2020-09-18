import React, { FC } from 'react';
import { Helmet } from 'react-helmet';

import Footer from './Footer';
import TopBar from './TopBar';

const BaseLayout: FC = ({ children }) => (
  <div className={`flex flex-col w-full min-h-screen`}>
    <Helmet>
      <title>My Title</title>
      <link rel='canonical' href='http://mysite.com/example' />
    </Helmet>
    <div className={`h-2px w-full fixed bg-blue`} />
    <TopBar />
    {children}
    <Footer />
  </div>
);

export default BaseLayout;
