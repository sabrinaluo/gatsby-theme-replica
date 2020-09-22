import {
  getDatePostsMap,
  getDaysSvgData,
  getFirstCalendarSunday,
  getMonthLabels,
} from '../calendar';
import { getDateString } from '../date';

describe('getFirstCalendarSunday', () => {
  it('end day is Sun', () => {
    const result = getDateString(
      getFirstCalendarSunday(new Date('2020-09-20'))
    );
    expect(result).toEqual('2019-09-22');
  });

  it('end day is Wed', () => {
    const result = getDateString(
      getFirstCalendarSunday(new Date('2020-09-16'))
    );
    expect(result).toEqual('2019-09-15');
  });

  it('end day is Sat', () => {
    const result = getDateString(
      getFirstCalendarSunday(new Date('2020-09-19'))
    );
    expect(result).toEqual('2019-09-15');
  });
});

describe('getDaysSvgData', () => {
  const result = getDaysSvgData(new Date('2020-09-18'));
  it('get correct translateX', () => {
    expect(result).toHaveProperty('0.translateX', 0);
    expect(result).toHaveProperty('20.translateX', 280);
  });

  it('get correct week data', () => {
    expect(result).toHaveProperty('20.week.2', {
      date: '2020-02-04',
      x: -6,
      y: 26,
    });
  });

  it('get correct last day', () => {
    const dataLen = result.length;
    const weekLen = result[dataLen - 1].week.length;
    expect(result).toHaveProperty(`${dataLen - 1}.week.${weekLen - 1}`, {
      date: '2020-09-18',
      x: -38,
      y: 65,
    });
  });
});

describe('getMonthLabels', () => {
  it('get month label', () => {
    const result = getMonthLabels(new Date('2020-09-21'));
    expect(result).toHaveProperty('0', {
      text: 'Sep',
      month: 8,
      x: 14,
    });

    expect(result).toHaveProperty('1', {
      text: 'Oct',
      month: 9,
      x: 40,
    });

    expect(result[result.length - 1]).toEqual({
      text: 'Sep',
      month: 8,
      x: 664,
    });
  });

  it('avoid overlapping', () => {
    const result = getMonthLabels(new Date('2020-09-27'));
    expect(result).toHaveProperty('0', {
      text: 'Oct',
      month: 9,
      x: 27,
    });
  });
});

describe('getPostsDateMap', () => {
  it('s', () => {
    expect(getDatePostsMap([])).toEqual(1);
  });
});
