import { FC } from 'react';
import { EventList } from 'components';
import { useEventContext } from 'contexts';

export const Events: FC = () => {
  const { events, filter } = useEventContext();

  return (
    <div className="bg-gradient-to-b from-yellow-300 to-pink-500">
      <label>
        <input
          type="checkbox"
          onChange={(e) => filter.teemunkierros.set(e.target.checked)}
          checked={filter.teemunkierros.value}
        />{' '}
        teemunkierros
      </label>

      <EventList events={events} />
    </div>
  );
};
