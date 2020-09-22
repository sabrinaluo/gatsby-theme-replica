import React, { FC } from 'react';

import Calendar from '../components/Calendar';
import Layout, { LayoutMode } from '../components/Layout';
import PostCardList from '../components/PostCardList';
import ReadMe from '../components/ReadMe';

const HomeTemplate: FC = () => {
  return (
    <Layout mode={LayoutMode.NavTab}>
      <ReadMe />
      <PostCardList />
      <Calendar />
    </Layout>
  );
};

export default HomeTemplate;
