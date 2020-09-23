// yyyy-MM-dd
type InputDate = Date | string | number;
export const getDateString = (date: InputDate) =>
  new Date(date).toLocaleDateString('fr-CA', {
    timeZone: process.env.TZ || 'UTC',
  });

export const format = (date: InputDate) =>
  new Date(date).toLocaleDateString('en-US', {
    timeZone: process.env.TZ || 'UTC',
    month: 'short',
    day: 'numeric',
  });

export const getRelativeTimeFromNow = (date: InputDate) => {
  const min = 60 * 1000;
  const hour = min * 60;
  const day = 24 * hour;
  const week = 7 * day;
  const month = 30 * day;
  const year = day * 365;

  const now = Date.now();
  const ts = new Date(date).getTime();
  const diff = now - ts;

  const map: Record<string, number> = {
    min,
    hour,
    day,
    week,
    month,
    year,
  };

  const keys = ['min', 'hour', 'day', 'week', 'month', 'year'];
  let unit = keys[0];
  for (let i = 0; i < keys.length; i++) {
    unit = keys[i];

    if (diff < map[unit]) {
      if (i === 0) {
        return 'Just now';
      } else {
        unit = keys[i - 1];
      }
      break;
    }
  }

  const num = Math.ceil(diff / map[unit]) - 1;
  return `${num} ${unit}${num > 1 ? 's' : ''} ago`;
};
