import MdiIcon from '@mdi/react';
import React, { FC, memo } from 'react';

const Icon: FC<any> = ({ path, size, ...props }) => {
  return <MdiIcon {...props} path={path} size={size / 1.5 / 14} />;
};

export default memo(Icon);
