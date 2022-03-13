import { EventItem } from 'interfaces';
import { Link } from 'react-router-dom';

interface EventListProps {
  events: EventItem[];
}

const Event = ({
  content: { title, dateBegin, dateEnd, location, image },
  slug,
}: Pick<EventItem, 'content' | 'slug'>) => (
  <li className="relative flex rounded-xl rounded-tl bg-white">
    <img
      className="w-32 rounded-tl rounded-bl-xl object-cover"
      src={image.filename}
      alt={image.alt || ''}
    />
    <div className="flex-auto py-2 px-4">
      <p>
        <Link
          to={slug}
          className="text-pink-700 before:absolute before:inset-0 before:content-[''] hover:underline"
        >
          {title}
        </Link>
      </p>
      <p>
        {dateBegin}–{dateEnd}
      </p>
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
