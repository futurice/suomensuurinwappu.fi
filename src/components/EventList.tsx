import { EventItem } from 'interfaces';
import { Link } from 'react-router-dom';

import { formatTimeRange } from 'utils';

import { Image } from './Image';

interface EventListProps {
  events: EventItem[];
}

const Event = ({
  content: { title, dateBegin, dateEnd, location, image },
  slug,
}: Pick<EventItem, 'content' | 'slug'>) => (
  <li className="relative flex rounded-md rounded-tl-sm bg-white">
    <Image
      className="w-32 rounded-bl-md rounded-tl-sm object-cover"
      src={image.filename}
      alt={image.alt || ''}
    />
    <div className="flex-auto py-2 px-4">
      <p>
        <Link
          to={slug}
          className="font-bold text-pink-700 before:absolute before:inset-0 before:content-[''] hover:underline"
        >
          {title}
        </Link>
      </p>
      <p>{formatTimeRange(dateBegin, dateEnd)}</p>
      <p>{location}</p>
    </div>
  </li>
);

export const EventList = ({ events }: EventListProps) => (
  <ul className="flex flex-col gap-4">
    {events.map(({ content, slug }) => (
      <Event key={slug} content={content} slug={slug} />
    ))}
  </ul>
);
