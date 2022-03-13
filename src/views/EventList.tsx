import { FC } from 'react';
import { useEventContext } from 'contexts';

export const EventList: FC = () => {
  const { events, filter } = useEventContext();

  return (
    <>
      <label>
        <input
          type="checkbox"
          onChange={(e) => filter.teemunkierros.set(e.target.checked)}
          checked={filter.teemunkierros.value}
        />{' '}
        teemunkierros
      </label>

      <ul>
        {events.map(
          ({ id, content: { title, dateBegin, dateEnd, location } }) => (
            <li key={id}>
              <p>{title}</p>
              <p>
                {dateBegin}–{dateEnd}
              </p>
              <p>{location}</p>
            </li>
          )
        )}
      </ul>
    </>
  );
};
