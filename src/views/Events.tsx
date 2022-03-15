import { VFC } from 'react';
import { Outlet } from 'react-router-dom';

import { EventList } from 'components';
import { useEventContext } from 'contexts';

export const Events: VFC = () => {
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

      <EventList events={events} />

      <Outlet />
    </>
  );
};
