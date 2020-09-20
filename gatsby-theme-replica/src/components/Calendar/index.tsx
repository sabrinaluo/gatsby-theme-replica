import React, { FC, useReducer } from 'react';

import {
  CalendarContext,
  calendarReducer,
  initialState,
} from './CalendarContext';
import ContributionGraph from './ContributionGraph';
import YearNavBar from './YearNavBar';

interface Props {}

const Calendar: FC<Props> = () => {
  const [state, dispatch] = useReducer(calendarReducer, initialState);
  const isCurrentYear = new Date().getFullYear() === state.year;

  return (
    <CalendarContext.Provider value={{ state, dispatch }}>
      <div className={`w-full flex flex-wrap`}>
        <div className={`w-full mb-2 font-medium`}>
          xx contributions in {isCurrentYear ? 'the last year' : state.year}
        </div>
        <div className={`border rounded-md w-full md:w-10/12 py-2`}>
          <ContributionGraph />
          <div className={`w-full mt-7 text-sm p-4 flex flex-col md:flex-row`}>
            <div className={`md:w-1/2`}>
              <div className={`pb-2`}>Contribution Activity</div>
              {state.date}
            </div>
            <div className={`md:w-1/2 md:border-l md:pl-4`}>@svg</div>
          </div>
        </div>

        <div className={`w-2/12 pl-8 sticky top-74px`}>
          <YearNavBar />
        </div>
      </div>
    </CalendarContext.Provider>
  );
};

export default Calendar;
