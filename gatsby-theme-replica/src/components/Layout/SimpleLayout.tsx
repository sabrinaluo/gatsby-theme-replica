import React, { FC } from 'react';

import BaseLayout from './BaseLayout';

const SimpleLayoutLayout: FC = ({ children }) => {
  return <BaseLayout>{children}</BaseLayout>;
};

export default SimpleLayoutLayout;
