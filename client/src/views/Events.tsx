import { VFC } from 'react';
import { Outlet } from 'react-router-dom';

import { EventList, Filter } from 'components';
import { useEventContext } from 'contexts';

export const Events: VFC = () => {
  const { events, filter } = useEventContext();

  return (
    <>
      <Filter {...filter.teemunkierros}>teemunkierros</Filter>

      <EventList events={events} />

      <Outlet />
    </>
  );
};
