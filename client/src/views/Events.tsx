import { VFC } from 'react';
import { Outlet } from 'react-router-dom';

import { EventList, Filter } from 'components';
import { useEventContext, useGlobalContext } from 'contexts';
import { Search } from 'components/Search';

export const Events: VFC = () => {
  const { translation } = useGlobalContext();
  const { events, filter, search } = useEventContext();

  return (
    <>
      <Filter {...filter.teemunkierros}>{translation?.teemunkierros}</Filter>
      <Filter {...filter.hervanta}>{translation?.hervanta}</Filter>
      <Filter {...filter.center}>{translation?.center}</Filter>
      <Filter {...filter.elsewhere}>{translation?.elsewhere}</Filter>
      <Filter {...filter.needsRegistration}>{translation?.registration}</Filter>
      <Filter {...filter.hasMusic}>{translation?.music}</Filter>
      <Filter {...filter.inside}>{translation?.inside}</Filter>
      <Filter {...filter.outside}>{translation?.outside}</Filter>
      <Filter {...filter.isRemote}>{translation?.remote}</Filter>
      <Search {...search} />

      <EventList events={events} />

      <Outlet />
    </>
  );
};
