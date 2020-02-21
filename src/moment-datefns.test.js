import moment from 'moment';

describe('These moment and date-fns function calls should be the same', () => {
  test('moment array formatting', () => {
    expect(moment([2020, 2, 20]).format('YYYY-MM-DD')).toBe('');
  });
});
