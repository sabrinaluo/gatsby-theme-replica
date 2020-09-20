import { Dispatch, createContext } from 'react';

interface CalendarState {
  year: number;
  date: null | string;
}

interface Action<T, U extends string = string> {
  type: U;
  payload: T;
}

type CalendarAction = Action<number, 'year'> | Action<string, 'date'>;

export const initialState: CalendarState = {
  year: new Date().getFullYear(),
  date: null,
};

export const CalendarContext = createContext<{
  state: CalendarState;
  dispatch: Dispatch<CalendarAction>;
}>({
  state: initialState,
  dispatch: () => {},
});

export const calendarReducer = (
  state: CalendarState,
  action: CalendarAction
) => {
  switch (action.type) {
    case 'year':
      return {
        ...state,
        date: null,
        year: action.payload,
      };
    case 'date':
      return {
        ...state,
        date: action.payload,
      };
    default:
      return state;
  }
};
