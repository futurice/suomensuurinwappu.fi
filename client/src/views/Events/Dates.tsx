import { useMemo, VFC } from 'react';
import { add, differenceInDays, format, getDay, setDay } from 'date-fns';

import {
  useEventContext,
  useGlobalContext,
  useLanguageContext,
} from 'contexts';
import { asDate, cn } from 'utils';

interface DateItemProps {
  date: Date;
}

const DateItem: VFC<DateItemProps> = ({ date }) => {
  const { lang } = useLanguageContext();
  const {
    dateSelect: { selected, onChange },
  } = useEventContext();

  const value = useMemo(() => format(date, 'yyyy-MM-dd'), [date]);
  const checked = useMemo(
    () => selected.some((s) => s === value),
    [selected, value]
  );

  return (
    <label
      className={cn(
        'style-btn w-8 cursor-pointer rounded-sm border border-cyan-700 px-3 transition-colors focus-within:ring',
        checked
          ? 'bg-cyan-700 text-white hover:bg-cyan-900'
          : 'bg-white text-cyan-700 hover:bg-cyan-300'
      )}
    >
      <input
        type="checkbox"
        checked={checked}
        value={value}
        onChange={onChange}
        className="sr-only"
      />
      <span className="sr-only">
        {date.toLocaleDateString(lang, { weekday: 'long' })}
      </span>
      {date.toLocaleDateString(lang, { day: 'numeric' })}
    </label>
  );
};

export const Dates: VFC = () => {
  const { lang } = useLanguageContext();
  const { translation } = useGlobalContext();
  const {
    data,
    dateSelect: { selected, reset },
  } = useEventContext();

  const weekdays: { day: string; idx: number }[] = useMemo(
    () =>
      new Array(7).fill(setDay(Date.now(), 1)).map((date, idx) => ({
        day: add(date, { days: idx }).toLocaleDateString(lang, {
          weekday: 'short',
        }),
        idx,
      })),
    [lang]
  );

  const dates: { date: Date | null; idx: number }[] = useMemo(() => {
    if (data.length > 0) {
      const dateData = data.map(
        ({ content: { dateBegin } }) => dateBegin.split(' ')[0]
      );

      const first = asDate(dateData[0]);
      const last = asDate(dateData[dateData.length - 1]);

      return [
        ...new Array(getDay(first) - 1).fill(null),
        ...new Array(differenceInDays(last, first) + 1)
          .fill(first)
          .map((date, idx) => add(date, { days: idx })),
      ].map((date, idx) => ({ date, idx }));
    }

    return [];
  }, [data]);

  return (
    <>
      <div className="m-auto mt-4 w-fit text-sm">
        <div
          className="style-heading mb-2 grid grid-cols-7 gap-2 text-center text-pink-700"
          aria-hidden={true}
        >
          {weekdays.map(({ day, idx }) => (
            <div key={idx}>{day}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {dates.map(({ date, idx }) =>
            date ? <DateItem key={idx} date={date} /> : <div key={idx} />
          )}
        </div>
      </div>

      {selected.length > 0 && (
        <button
          onClick={reset}
          className="style-btn mx-auto mt-6 flex-none bg-cyan-700 px-3 text-white transition-colors hover:bg-cyan-900"
        >
          {translation?.filterReset}
        </button>
      )}
    </>
  );
};
