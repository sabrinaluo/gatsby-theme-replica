const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;
const TOTAL_WEEKS_PER_YEAR = 52;
export const WEEK_DAY_TEXT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const MONTH_TEXT = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const getFirstCalendarSunday = (endDate: Date = new Date()) => {
  const day = endDate.getDay();
  return new Date(
    endDate.getTime() - (TOTAL_WEEKS_PER_YEAR * 7 + day) * ONE_DAY_IN_MS
  );
};

const getDateStr = (date: Date) => date.toISOString().slice(0, 10);

interface MonthData {
  month: number;
  x: number;
  text: string;
}

export const getCalendarData = (endDate: Date = new Date()) => {
  const dataByYear = [];
  const monthData: MonthData[] = [];
  const firstDate = getFirstCalendarSunday(endDate);

  for (let i = 0; i <= TOTAL_WEEKS_PER_YEAR; i++) {
    const dataByWeek = [];

    for (let j = 0; j < 7; j++) {
      const currentTs = firstDate.getTime() + (i * 7 + j) * ONE_DAY_IN_MS;
      const currentDate = new Date(currentTs);
      const currentMonth = currentDate.getMonth();

      const prevProcessedMonth = monthData[monthData.length - 1]?.month;
      if (j === 0 && prevProcessedMonth !== currentMonth) {
        monthData.push({
          month: currentMonth,
          x: 14 + i * 13,
          text: MONTH_TEXT[currentMonth],
        });
      }

      if (endDate.getTime() < currentTs) break;
      dataByWeek.push({
        x: 14 - i,
        y: j * 13,
        date: getDateStr(currentDate),
      });
    }

    dataByYear.push({
      translateX: i * 14,
      week: dataByWeek,
    });
  }

  return {
    monthData,
    data: dataByYear,
  };
};
