import { VFC } from 'react';
import { useLanguageContext } from 'contexts';

const DATE: Intl.DateTimeFormatOptions = {
  month: 'numeric',
  day: 'numeric',
};

const TIME: Intl.DateTimeFormatOptions = {
  hour: 'numeric',
  minute: 'numeric',
};

const DATETIME: Intl.DateTimeFormatOptions = { ...DATE, ...TIME };

export const formatTimeRange = (
  locale: string,
  beginStr: string,
  endStr: string
) => {
  const begin = new Date(beginStr);
  const end = new Date(endStr);

  const isSameDate =
    begin.getMonth() === end.getMonth() && begin.getDate() === end.getDate();

  return [
    begin.toLocaleString(locale, DATETIME),
    end.toLocaleString(locale, isSameDate ? TIME : DATETIME),
  ].join(isSameDate ? '–' : ' – ');
};

export const formatDay = (locale: string, str: string) => {
  const date = new Date(str);
  return date.toLocaleDateString(locale, {
    day: 'numeric',
    month: 'numeric',
    weekday: 'long',
  });
};

interface DateTimeProps {
  value: string | [string, string];
}

const DateTime: VFC<DateTimeProps> = ({ value }) => {
  const { lang } = useLanguageContext();

  return (
    <>
      {Array.isArray(value)
        ? formatTimeRange(lang, value[0], value[1])
        : formatDay(lang, value)}
    </>
  );
};

export const Format = {
  DateTime,
};
