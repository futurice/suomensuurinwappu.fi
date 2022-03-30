import { VFC } from 'react';
import { Outlet } from 'react-router-dom';

import { EventList, Filter } from 'components';
import { useEventContext, useGlobalContext } from 'contexts';

export const Events: VFC = () => {
  const { translation } = useGlobalContext();
  const { events, filter } = useEventContext();

  return (
    <>
      <Filter {...filter.teemunkierros}>{translation?.teemunkierros}</Filter>

      <EventList events={events} />

      <Outlet />
    </>
  );
};
