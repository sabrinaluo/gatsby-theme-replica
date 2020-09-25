import { getRelativeTimeFromNow } from '../date';

test('getRelativeTimeFromNow', () => {
  expect(getRelativeTimeFromNow('2020-09-24')).toEqual('Just now');
  expect(getRelativeTimeFromNow(Date.now() - 59 * 60 * 1000)).toEqual(
    '1 week ago'
  );

  expect(getRelativeTimeFromNow('2020-09-15')).toEqual('1 week ago');
  expect(getRelativeTimeFromNow('2020-08-15')).toEqual('1 month ago');
  expect(getRelativeTimeFromNow('2019-08-24')).toEqual('1 year ago');
  expect(getRelativeTimeFromNow('2018-08-24')).toEqual('2 years ago');
});
