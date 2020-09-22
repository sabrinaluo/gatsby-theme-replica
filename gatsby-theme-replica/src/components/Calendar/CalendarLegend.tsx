import React, { FC } from 'react';

import { color } from '../../theme';

export const legendColors = [
  color.gray[120],
  color.green.superlight,
  color.green.light,
  color.green.medium,
  color.green.dark,
];

const CalendarLegend: FC = () => {
  return (
    <ul className={`calendar-legend`}>
      <li className={`bg-gray-120`} />
      <li className={`bg-green-superlight`} />
      <li className={`bg-green-light`} />
      <li className={`bg-green-medium`} />
      <li className={`bg-green-dark`} />
    </ul>
  );
};

export default CalendarLegend;
