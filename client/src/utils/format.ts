const TIME_FORMAT = /^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})$/;

interface DateTime {
  month: number;
  day: number;
  hour: number;
  minute: number;
}

const parseDateTime = (str: string): DateTime => {
  const [, , ...date] = str.match(TIME_FORMAT) || [];
  const [month, day, hour, minute] = date.map((d) => parseInt(d));

  return { month, day, hour, minute };
};

const formatDate = (
  { month, day, hour, minute }: DateTime,
  onlyTime?: boolean
) =>
  `${onlyTime ? '' : `${day}.${month}. `}${hour}:${minute
    .toString()
    .padStart(2, '0')}`;

export const formatTimeRange = (beginStr: string, endStr: string) => {
  const begin = parseDateTime(beginStr);
  const end = parseDateTime(endStr);

  const isSameDate = begin?.month === end?.month && begin?.day === end?.day;

  return [formatDate(begin), formatDate(end, isSameDate)].join(
    isSameDate ? '–' : ' – '
  );
};
