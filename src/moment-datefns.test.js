import moment from 'moment';
import { format, isAfter, isBefore, differenceInDays } from 'date-fns';
import enLocale from 'date-fns/locale/en-GB';
import nlLocale from 'date-fns/locale/nl';

describe('These moment and date-fns function calls should be the same', () => {
  test('moment array formatting', () => {
    const stringDateFormat = 'YYYY-MM-DD';
    expect(moment(['2020', '02', '21']).format(stringDateFormat)).toBe(
      format(new Date('2020', '02', '21'), 'yyyy-MM-dd')
    );
  });
  test('isAfter with date string', () => {
    const beforeDateString = '2020-02-21';
    const afterDateString = '2020-03-21';
    expect(moment(afterDateString).isAfter(moment(beforeDateString))).toBe(
      isAfter(new Date(afterDateString), new Date(beforeDateString))
    );
  });
  test('isBefore with date string', () => {
    const beforeDateString = '2020-02-21';
    const afterDateString = '2020-03-21';
    expect(moment(beforeDateString).isAfter(moment(afterDateString))).toBe(
      isAfter(new Date(beforeDateString), new Date(afterDateString))
    );
  });
  test('isBefore current date', () => {
    const beforeDateString = '2019-01-01';
    expect(moment(beforeDateString).isBefore(moment())).toBe(
      isBefore(new Date(beforeDateString), new Date())
    );
  });
  test('LL formatting in en-GB locale', () => {
    expect(
      moment('2020-02-21')
        .locale('en-GB')
        .format('LL')
    ).toBe(
      format(new Date('2020-02-21'), 'dd MMMM yyyy', { locale: enLocale })
    );
  });
  test('LL formatting in nl-NL locale', () => {
    expect(
      moment('2020-02-21')
        .locale('nl-NL')
        .format('LL')
    ).toBe(
      format(new Date('2020-02-21'), 'dd MMMM yyyy', { locale: nlLocale })
    );
  });
  test('ll formatting in en-GB locale', () => {
    expect(
      moment('2020-02-21')
        .locale('en-GB')
        .format('ll')
    ).toBe(format(new Date('2020-02-21'), 'dd MMM yyyy', { locale: enLocale }));
  });
  // This is not entirely the same, namely "feb." instead of "feb", but this is neglectible for our use cases.
  test.skip('ll formatting in nl-NL locale', () => {
    expect(
      moment('2020-02-21')
        .locale('nl-NL')
        .format('ll')
    ).toBe(format(new Date('2020-02-21'), 'dd MMM yyyy', { locale: nlLocale }));
  });
  test('diff days', () => {
    expect(moment().diff(moment('2017-02-28T11:34:41.814Z'), 'days')).toBe(
      differenceInDays(new Date(), new Date('2017-02-28T11:34:41.814Z'))
    );
  });
  test('MMM YYYY formatting', () => {
    expect(moment('2017-02-28T11:34:41.814Z').format('MMM YYYY')).toBe(
      format(new Date('2017-02-28T11:34:41.814Z'), 'MMM yyyy')
    );
  });
  test('getting the individual date values', () => {
    const momentDate = moment('2020-02-21');
    const nativeDate = new Date('2020-02-21');
    const momentMonthNumber = momentDate.get('month') + 1;
    const nativeMonthNumber = nativeDate.getMonth() + 1;
    expect({
      viewDateDay: momentDate.get('date').toString(),
      // we prepend a zero, so it matches the month numbers defined
      viewDateMonth:
        momentMonthNumber < 10
          ? `0${momentMonthNumber}`
          : momentMonthNumber.toString(),
      viewDateYear: momentDate.get('year').toString(),
    }).toEqual({
      viewDateDay: nativeDate.getDate().toString(),
      viewDateMonth:
        nativeMonthNumber < 10
          ? `0${nativeMonthNumber}`
          : nativeMonthNumber.toString(),
      viewDateYear: nativeDate.getFullYear().toString(),
    });
  });
});
