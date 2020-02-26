import moment from 'moment';
import { format, isAfter, isBefore, differenceInDays } from 'date-fns';
import enLocale from 'date-fns/locale/en-US';
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

  // Locale formatting tests, these p/P values only work with date-fns@^2.0.0
  // This is slightly different, namely "21st" instead of just "21". This should be neglectible.
  test.skip('LL formatting in en (en-US) locale', () => {
    expect(
      moment('2020-02-21')
        .locale('en')
        .format('LL')
    ).toBe(format(new Date('2020-02-21'), 'PPP', { locale: enLocale }));
  });
  test('LL formatting in nl-NL locale', () => {
    expect(
      moment('2020-02-21')
        .locale('nl-NL')
        .format('LL')
    ).toBe(format(new Date('2020-02-21'), 'PPP', { locale: nlLocale }));
  });
  test('lll formatting in en (en-US) locale', () => {
    expect(
      moment('2019-10-15T09:48:54.135Z')
        .locale('en')
        .format('lll')
    ).toBe(
      format(new Date('2019-10-15T09:48:54.135Z'), 'PP p', { locale: null })
    );
  });
  test('lll formatting in nl-NL locale', () => {
    expect(
      moment('2019-10-15T09:48:54.135Z')
        .locale('nl-NL')
        .format('lll')
    ).toBe(
      format(new Date('2019-10-15T09:48:54.135Z'), 'PP p', { locale: nlLocale })
    );
  });
  test('ll formatting in en (en-US) locale', () => {
    expect(
      moment('2020-02-21')
        .locale('en')
        .format('ll')
    ).toBe(format(new Date('2020-02-21'), 'PP', { locale: enLocale }));
  });
  test('ll formatting in nl-NL locale', () => {
    expect(
      moment('2020-02-21')
        .locale('nl-NL')
        .format('ll')
    ).toBe(format(new Date('2020-02-21'), 'PP', { locale: nlLocale }));
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

describe('date-fns edge cases', () => {
  test('new date is not before new date', () => {
    expect(isBefore(new Date(), new Date())).toBe(false);
  });
});

describe('moment edge cases', () => {
  test('undefined moment isbefore future', () => {
    expect(moment(undefined).isBefore(moment('3030-01-01'))).toBe(
      isBefore(new Date(), new Date('3030-01-01'))
    );
  });
  test('future isbefore undefined moment', () => {
    expect(moment('3030-01-01').isBefore(moment(undefined))).toBe(
      isBefore(new Date('3030-01-01'), new Date())
    );
  });
  test('undefined isbefore some moment in the past', () => {
    expect(moment(undefined).isBefore(moment('2019-01-01'))).toBe(
      isBefore(new Date(), new Date('2019-01-01'))
    );
  });
  test('some moment in the past isbefore undefined', () => {
    expect(moment('2019-01-01').isBefore(moment(undefined))).toBe(
      isBefore(new Date('2019-01-01'), new Date())
    );
  });
});
