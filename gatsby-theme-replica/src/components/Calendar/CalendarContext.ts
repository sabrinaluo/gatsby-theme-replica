import { Dispatch, createContext } from 'react';

interface CalendarState {
  year: number;
  date: string;
  endDate: Date;
}

interface Action<T, U extends string = string> {
  type: U;
  payload: T;
}

type CalendarAction = Action<number, 'year'> | Action<string, 'date'>;

const today = new Date();
export const initialState: CalendarState = {
  year: today.getFullYear(),
  endDate: today,
  date: '',
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
      const year = action.payload;
      const endDate =
        today.getFullYear() === year ? today : new Date(`${year}-12-31`);
      return {
        ...state,
        date: '',
        year,
        endDate,
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
