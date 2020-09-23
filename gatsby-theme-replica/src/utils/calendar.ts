import { BriefPost, PostNode } from '../types/post';
import { getDateString, getRelativeTimeFromNow } from './date';

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

interface MonthData {
  month: number;
  x: number;
  text: string;
}

export const getMonthLabels = (endDate: Date) => {
  const data: MonthData[] = [];
  const firstDate = getFirstCalendarSunday(endDate);

  for (let i = 0; i <= TOTAL_WEEKS_PER_YEAR; i++) {
    const sunday = new Date(firstDate.getTime() + i * 7 * ONE_DAY_IN_MS);
    const month = sunday.getMonth();
    const nextColMonth = new Date(
      sunday.getTime() + 7 * ONE_DAY_IN_MS
    ).getMonth();

    // avoid labels overlapping next to each cols
    if (i === 0 && month !== nextColMonth) {
      continue;
    }

    const prevColMonth = new Date(
      sunday.getTime() - 7 * ONE_DAY_IN_MS
    ).getMonth();
    if (i === 0 || month !== prevColMonth) {
      data.push({
        month,
        text: MONTH_TEXT[month],
        x: 14 + i * 13,
      });
    }
  }
  return data;
};

export const getDaysSvgData = (endDate: Date) => {
  const dataByYear = [];
  const firstDate = getFirstCalendarSunday(endDate);

  for (let i = 0; i <= TOTAL_WEEKS_PER_YEAR; i++) {
    const dataByWeek = [];

    for (let j = 0; j < 7; j++) {
      const currentTs = firstDate.getTime() + (i * 7 + j) * ONE_DAY_IN_MS;
      const currentDate = new Date(currentTs);

      if (endDate.getTime() < currentTs) break;
      dataByWeek.push({
        x: 14 - i,
        y: j * 13,
        date: getDateString(currentDate),
      });
    }

    dataByYear.push({
      translateX: i * 14,
      week: dataByWeek,
    });
  }

  return dataByYear;
};

export const getCalendarData = (endDate: Date = new Date()) => {
  return {
    monthData: getMonthLabels(endDate),
    data: getDaysSvgData(endDate),
  };
};

export type DatePostsMap = Record<string, BriefPost[]>;

export const getDatePostsMap = (posts: PostNode[]) => {
  const map = {} as DatePostsMap;
  posts?.forEach((post) => {
    const date = getDateString(post.frontmatter.date);
    if (!map[date]) {
      map[date] = [];
    }

    map[date].push({
      id: post.id,
      slug: post.fields.slug,
      title: post.frontmatter.title,
      date: post.frontmatter.date,
      relativeDate: getRelativeTimeFromNow(post.frontmatter.date),
    });
  });

  return map;
};
