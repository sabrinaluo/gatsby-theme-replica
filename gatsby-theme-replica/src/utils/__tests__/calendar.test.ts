import { getCalendarData, getFirstCalendarSunday } from '../calendar';

const getDateStr = (date: Date) => date.toISOString().slice(0, 10);

describe('getFirstCalendarSunday', () => {
  it('end day is Sun', () => {
    const result = getDateStr(getFirstCalendarSunday(new Date('2020-09-20')));
    expect(result).toEqual('2019-09-22');
  });

  it('end day is Wed', () => {
    const result = getDateStr(getFirstCalendarSunday(new Date('2020-09-16')));
    expect(result).toEqual('2019-09-15');
  });

  it('end day is Sat', () => {
    const result = getDateStr(getFirstCalendarSunday(new Date('2020-09-19')));
    expect(result).toEqual('2019-09-15');
  });
});

describe('getCalendar', () => {
  const result = getCalendarData(new Date('2020-09-18'));
  it('get correct translateX', () => {
    expect(result).toHaveProperty('data.0.translateX', 0);
    expect(result).toHaveProperty('data.20.translateX', 280);
  });

  it('get correct week data', () => {
    expect(result).toHaveProperty('data.20.week.2', {
      date: '2020-02-04',
      x: -6,
      y: 26,
    });
  });

  it('get correct last day', () => {
    const dataLen = result.data.length;
    const weekLen = result.data[dataLen - 1].week.length;
    expect(result).toHaveProperty(`data.${dataLen - 1}.week.${weekLen - 1}`, {
      date: '2020-09-18',
      x: -38,
      y: 65,
    });
  });
});
