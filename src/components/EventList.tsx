import { EventItem } from 'interfaces';

interface EventListProps {
  events: EventItem[];
}

const Event = ({
  content: { title, dateBegin, dateEnd, location, image },
}: Pick<EventItem, 'content'>) => (
  <li className="flex bg-white rounded-xl rounded-tl">
    <img
      className="w-32 rounded-tl rounded-bl-xl object-cover"
      src={image.filename}
      alt={image.alt || ''}
    />
    <div className="flex-auto py-2 px-4">
      <p>{title}</p>
      <p>
        {dateBegin}–{dateEnd}
      </p>
      <p>{location}</p>
    </div>
  </li>
);

export const EventList = ({ events }: EventListProps) => (
  <ul className="flex flex-col gap-4 p-4">
    {events.map(({ id, content }) => (
      <Event key={id} content={content} />
    ))}
  </ul>
);
