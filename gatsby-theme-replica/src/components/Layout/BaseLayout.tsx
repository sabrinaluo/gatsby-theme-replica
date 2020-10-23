import React, { FC } from 'react';
import { Helmet } from 'react-helmet';

import useConfig from '../../hooks/useConfig';
import Footer from './Footer';
import TopBar from './TopBar';

const BaseLayout: FC = ({ children }) => {
  const config = useConfig();
  return (
    <div className={`flex flex-col w-full min-h-screen`}>
      <Helmet>
        <title>{config.siteName}</title>
        <meta name='description' content={config.description} />
        <meta name='author' content={config.author} />
        <link
          rel='canonical'
          href={`${config.siteUrl}${config.pathPrefix ?? ''}`}
        />
        <link
          rel='icon'
          type='image/svg+xml'
          href='https://github.githubassets.com/favicons/favicon.svg'
        ></link>
      </Helmet>
      <TopBar />
      {children}
      <Footer />
    </div>
  );
};

export default BaseLayout;
