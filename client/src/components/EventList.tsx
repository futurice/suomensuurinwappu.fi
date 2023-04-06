import { forwardRef, useEffect, useMemo, useState, VFC } from 'react';
import { Link, useParams } from 'react-router-dom';

import { useEventContext, useGlobalContext } from 'contexts';
import { EventItem } from 'interfaces';
import { Format } from 'utils';

import { EventInfo } from './EventInfo';
import { Image } from './Image';
import { Tag } from './Tag';
import { Favourite } from './Favourite';

interface EventListProps {
  events: EventItem[];
}


const Event = forwardRef<HTMLAnchorElement, EventItem>(
  ({ content, slug }, ref) => {
    const { translation } = useGlobalContext();
    return (
      <li className="style-focus relative flex rounded-md bg-white drop-shadow focus-within:ring md:flex-col">
        <Image
          className="w-32 rounded-bl-md rounded-tl-md md:h-32 md:w-auto md:rounded-b-none md:rounded-tr-md"
          crop="512x256"
          img={content.image}
        />
        <div className='flex flex-auto flex-row'>
          <div className="flex flex-auto flex-col gap-1 px-4 pt-2 pb-3 md:px-6 md:pt-3 md:pb-4">
            <p className="style-heading mb-0.5">
              <Link
                ref={ref}
                to={slug}
                className="text-cyan-700 outline-none before:absolute before:inset-0 before:z-10 before:content-[''] hover:underline focus:underline"
              >
                {content.title}
              </Link>
            </p>
            {content.teemunkierros && <Tag>{translation?.teemunkierros}</Tag>}
            <EventInfo {...content} />
          </div>
          <div className="flex items-end pr-3 pb-4">
            <Favourite slug={slug} />
          </div>
        </div>
      </li>
    );
  }
);

export const EventList: VFC<EventListProps> = ({ events }) => {
  const { currentRef } = useEventContext();
  const { slug } = useParams<'slug'>();
  const [current, setCurrent] = useState<string>();

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

  useEffect(() => {
    // Keep previous ref if moving to list view from modal
    if (slug) {
      setCurrent(
        events.some((event) => event.slug === slug) ? slug : events[0]?.slug
      );
    }
  }, [events, slug]);

  return (
    <ul className="m-auto max-w-7xl">
      {Object.entries(grouped).map(([date, group]) => (
        <li key={date}>
          <h2 className="my-6 -ml-4 inline-flex rounded-r bg-white py-2 px-4 text-sm font-bold text-pink-700 xl:ml-0 xl:rounded">
            <Format.DateTime value={date} />
          </h2>
          <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {group.map((event) => (
              <Event
                ref={event.slug === current ? currentRef : undefined}
                key={event.slug}
                {...event}
              />
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
};
