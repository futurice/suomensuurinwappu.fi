import { useMemo } from 'react';
import {
  add,
  differenceInDays,
  format,
  getDay,
  isAfter,
  isSameDay,
  setDay,
  startOfToday,
} from 'date-fns';

import { useLanguageContext } from 'contexts';
import { Event, QueryResponseItem } from 'interfaces';
import { asDate } from 'utils';

interface Weekday {
  day: string;
  idx: number;
}

interface DateOption {
  date?: Date;
  idx: number;
}

const getInitialLength = (current: Date, last: Date) => {
  if (isSameDay(current, last)) return 1;
  if (isAfter(current, last)) return 0;
  return differenceInDays(last, current) + 2;
};

export const useDates = (eventData: QueryResponseItem<Event>[]) => {
  const { lang } = useLanguageContext();

  const weekdays: Weekday[] = useMemo(
    () =>
      new Array(7).fill(setDay(Date.now(), 1)).map((date, idx) => ({
        day: add(date, { days: idx }).toLocaleDateString(lang, {
          weekday: 'short',
        }),
        idx,
      })),
    [lang]
  );

  const [first, last]: [string | undefined, string | undefined] =
    useMemo(() => {
      const dateData = eventData.map(
        ({ content: { dateBegin } }) => dateBegin.split(' ')[0]
      );

      const firstStr = dateData[0];
      const lastStr = dateData[dateData.length - 1];

      if (firstStr && lastStr) {
        return [firstStr, lastStr];
      }

      return [undefined, undefined];
    }, [eventData]);

  const options: DateOption[] = useMemo(() => {
    if (first && last) {
      return [
        ...new Array(getDay(asDate(first)) - 1).fill(null),
        ...new Array(differenceInDays(asDate(last), asDate(first)) + 1)
          .fill(asDate(first))
          .map((date, idx) => add(date, { days: idx })),
      ].map((date, idx) => ({ date, idx }));
    }

    return [];
  }, [first, last]);

  const initial: string[] = useMemo(() => {
    if (last) {
      const current = startOfToday();

      return new Array(getInitialLength(current, asDate(last)))
        .fill(current)
        .map((date, idx) => format(add(date, { days: idx }), 'yyyy-MM-dd'));
    }

    return [];
  }, [last]);

  return { initial, options, weekdays };
};
