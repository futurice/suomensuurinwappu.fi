import { Link } from 'react-router-dom';

import { EventItem } from 'interfaces';

import { EventInfo } from './EventInfo';
import { Image } from './Image';

interface EventListProps {
  events: EventItem[];
}

const Event = ({ content, slug }: EventItem) => (
  <li className="relative flex rounded-md rounded-tl bg-white">
    <Image
      className="w-32 rounded-bl-md rounded-tl"
      src={content.image.filename}
      alt={content.image.alt}
    />
    <div className="flex flex-auto flex-col gap-1 py-2 px-4">
      <p>
        <Link
          to={slug}
          className="font-bold text-cyan-700 before:absolute before:inset-0 before:content-[''] hover:underline"
        >
          {content.title}
        </Link>
      </p>
      <EventInfo {...content} />
    </div>
  </li>
);

export const EventList = ({ events }: EventListProps) => (
  <ul className="flex flex-col gap-4">
    {events.map((event) => (
      <Event key={event.slug} {...event} />
    ))}
  </ul>
);
