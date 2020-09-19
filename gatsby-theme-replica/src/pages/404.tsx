import { Link } from 'gatsby';
import React, { FC } from 'react';
import { Helmet } from 'react-helmet';

import unicornImg from '../assets/unicorn.png';
import Layout from '../components/Layout';

const NotFound: FC = () => {
  return (
    <Layout>
      <Helmet>
        <title>Unicorn! · 404 Not Found</title>
        <link rel='canonical' href='/404' />
      </Helmet>
      <div
        className={`text-center flex flex-col items-center text-gray-dark text-opacity-50`}
      >
        <Link to={'/'}>
          <img
            src={unicornImg}
            alt='unicorn'
            className={`w-40 md:w-56 mx-4 mt-12`}
          />
        </Link>
        <h2 className={`font-bold text-3xl my-4`}>
          404
          <br />
          Not Found
        </h2>
        <p className={`text-sm mb-8`}>
          This is not the web page you are looking for.
        </p>
      </div>
    </Layout>
  );
};

export default NotFound;
