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
      <Filter {...filter.hervanta}>Hervannassa</Filter>
      <Filter {...filter.center}>Keskustassa</Filter>
      <Filter {...filter.elsewhere}>Muualla</Filter>
      <Filter {...filter.needsRegistration}>Ennakkoilmoittatuminen</Filter>
      <Filter {...filter.hasMusic}>Musiikkia</Filter>
      <Filter {...filter.inside}>Sisällä</Filter>
      <Filter {...filter.outside}>Ulkona</Filter>
      <Filter {...filter.isRemote}>Etänä</Filter>
      <EventList events={events} />

      <Outlet />
    </>
  );
};
