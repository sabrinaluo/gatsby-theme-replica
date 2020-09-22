import { graphql, useStaticQuery } from 'gatsby';
import React, { FC, useContext } from 'react';

import { CalendarContext } from './CalendarContext';

interface Props {}

const YearNavBar: FC<Props> = () => {
  const { state, dispatch } = useContext(CalendarContext);
  const data = useStaticQuery(graphql`
    query FirstPost {
      allMdx(
        filter: {
          slug: { ne: "README" }
          frontmatter: { date: { ne: "null" } }
        }
        sort: { fields: frontmatter___date, order: ASC }
        limit: 1
      ) {
        nodes {
          frontmatter {
            date
          }
        }
      }
    }
  `);

  const currentYear = new Date().getFullYear();
  const selectedYear = state.year;
  const firstYear =
    new Date(data.allMdx.nodes?.[0]?.frontmatter?.date).getFullYear() ||
    currentYear;
  const total = currentYear - firstYear + 1;

  const handleClick = (year: number) => {
    dispatch({
      type: 'year',
      payload: year,
    });
  };

  return (
    <div className={`flex-col flex w-24 sticky top-74px`}>
      {new Array(total).fill(0).map((_, index) => (
        <div
          key={index}
          onClick={() => handleClick(currentYear - index)}
          className={`${
            selectedYear === currentYear - index
              ? 'bg-blue text-white hover:bg-blue'
              : 'hover:bg-gray-100 text-gray-200'
          } cursor-pointer rounded-md px-4 py-2 text-xs mb-2 no-underline`}
        >
          {currentYear - index}
        </div>
      ))}
    </div>
  );
};

export default YearNavBar;
