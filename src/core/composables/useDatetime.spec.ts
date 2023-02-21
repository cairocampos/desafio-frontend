import { DateTime } from 'luxon';
import useDatetime from './useDatetime';

describe('useDatetime', () => {
  test('timeDiff', () => {
    const { timeDiff } = useDatetime();

    const date2MonthsAgo = DateTime.now().minus({months: 2}).toISODate()
    expect(timeDiff(date2MonthsAgo))
      .toEqual('2 meses atrás')

    const OneYearAgo = DateTime.now().minus({year: 1}).toISODate();
    expect(timeDiff(OneYearAgo)).toEqual('1 ano atrás')

    const date4HoursAgo = DateTime.now().minus({hours: 4}).toISO()

    expect(timeDiff(date4HoursAgo))
      .toEqual('4 horas atrás')
  });
})