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
  <li className="relative flex rounded-md rounded-tl bg-white">
    <Image
      className="w-32 rounded-bl-md rounded-tl"
      src={content.image.filename}
      alt={content.image.alt}
    />
    <div className="flex flex-auto flex-col gap-1 px-4 pt-1 pb-2">
      <p>
        <Link
          to={slug}
          className="style-heading text-cyan-700 before:absolute before:inset-0 before:content-[''] hover:underline"
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
    <ul>
      {Object.entries(grouped).map(([date, group]) => (
        <li key={date}>
          <h2 className="my-6 -ml-4 inline-flex rounded-tr-sm rounded-br-sm bg-white py-2 px-4 text-sm font-bold text-pink-700">
            <Format.DateTime value={date} />
          </h2>
          <ul className="flex flex-col gap-4">
            {group.map((event) => (
              <Event key={event.slug} {...event} />
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
};
