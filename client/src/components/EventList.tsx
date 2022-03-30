import { useMemo, VFC } from 'react';
import { Link } from 'react-router-dom';

import { EventItem } from 'interfaces';
import { Format } from 'utils';

import { EventInfo } from './EventInfo';
import { Image } from './Image';
import { Tag } from './Tag';

interface EventListProps {
  events: EventItem[];
}

const Event: VFC<EventItem> = ({ content, slug }) => (
  <li className="style-focus relative flex rounded-md rounded-tl bg-white drop-shadow md:flex-col">
    <Image
      className="w-32 rounded-bl-md rounded-tl md:h-32 md:w-auto md:rounded-b-none md:rounded-tr-md"
      src={content.image.filename}
      alt={content.image.alt}
    />
    <div className="flex flex-auto flex-col gap-1 px-4 pt-2 pb-3">
      <p className="style-heading mb-0.5">
        <Link
          to={slug}
          className="text-cyan-700 outline-none before:absolute before:inset-0 before:content-[''] hover:underline focus:underline"
        >
          {content.title}
        </Link>
      </p>
      {content.teemunkierros && <Tag>Teemunkierros</Tag>}
      <EventInfo {...content} />
    </div>
  </li>
);

export const EventList: VFC<EventListProps> = ({ events }) => {
  const grouped = useMemo(
    () =>
      events.reduce((acc, cur) => {
        const day = cur.content.dateBegin.split(' ')[0];

        return {
          ...acc,
          [day]: [...(acc[day] || []), cur],
        };
      }, {} as Record<string, EventItem[]>),
    [events]
  );

  return (
    <ul className="m-auto max-w-7xl">
      {Object.entries(grouped).map(([date, group]) => (
        <li key={date}>
          <h2 className="my-6 -ml-4 inline-flex rounded-r-sm bg-white py-2 px-4 text-sm font-bold text-pink-700 xl:ml-0 xl:rounded-sm">
            <Format.DateTime value={date} />
          </h2>
          <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {group.map((event) => (
              <Event key={event.slug} {...event} />
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
};
