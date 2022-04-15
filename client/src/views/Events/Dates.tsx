import { useMemo, VFC } from 'react';
import { format, isSameDay, startOfToday } from 'date-fns';

import { useEventContext, useLanguageContext } from 'contexts';
import { useEnterClick } from 'hooks';
import { cn } from 'utils';

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
  const current = useMemo(() => isSameDay(startOfToday(), date), [date]);

  const enterClick = useEnterClick();

  return (
    <label
      className={cn(
        'style-btn style-heading relative w-8 cursor-pointer rounded-sm border border-cyan-700 px-3 transition-colors focus-within:ring',
        checked
          ? 'bg-cyan-700 text-white hover:bg-cyan-900'
          : 'bg-white text-cyan-700 hover:bg-cyan-300'
      )}
      {...(current && { 'aria-current': 'date' })}
      {...enterClick}
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
      {current && (
        <div
          aria-hidden="true"
          className="absolute bottom-1 h-1 w-1 rounded-full bg-current"
        />
      )}
    </label>
  );
};

export const Dates: VFC = () => {
  const { dates } = useEventContext();

  return (
    <div className="m-auto mt-4 w-fit text-sm">
      <div
        className="style-heading mb-2 grid grid-cols-7 gap-2 text-center text-pink-700"
        aria-hidden={true}
      >
        {dates.weekdays.map(({ day, idx }) => (
          <div key={idx}>{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {dates.options.map(({ date, idx }) =>
          date ? <DateItem key={idx} date={date} /> : <div key={idx} />
        )}
      </div>
    </div>
  );
};
