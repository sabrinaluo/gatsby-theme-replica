import React, { FC, useReducer } from 'react';

import { useDatePostsMap } from '../../hooks/usePosts';
import useTotal from '../../hooks/useTotal';
import ActivityTimeline from './ActivityTimeline';
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
  const { yearly } = useTotal();

  const datePostsMap = useDatePostsMap();
  const displayPosts = datePostsMap[state.date];

  return (
    <CalendarContext.Provider value={{ state, dispatch }}>
      <div className={`w-full flex`}>
        <div className={`w-full md:w-10/12`}>
          <div className={`mb-2 font-medium`}>
            {yearly[state.year]} contributions in{' '}
            {isCurrentYear ? 'the last year' : state.year}
          </div>
          <div className={`border rounded-md py-2`}>
            <ContributionGraph />
            <div
              className={`w-full mt-7 text-sm p-4 flex flex-col md:flex-row`}
            >
              <div className={`md:w-1/2`}>
                <div className={`pb-2`}>Activity overview</div>
              </div>
              <div className={`md:w-1/2 md:border-l md:pl-4`}>@svg</div>
            </div>
          </div>
          <div>
            <div className={`mt-8 mb-2 font-medium`}>Contribution activity</div>
            <ActivityTimeline posts={displayPosts} />
          </div>
        </div>
        <div className={`hidden md:block md:w-2/12 pl-8`}>
          <YearNavBar />
        </div>
      </div>
    </CalendarContext.Provider>
  );
};

export default Calendar;
