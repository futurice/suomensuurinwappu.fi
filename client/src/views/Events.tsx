import { VFC } from 'react';
import { Outlet } from 'react-router-dom';
import { DialogDisclosure, useDialogState } from 'reakit/Dialog';

import { EventList, Filter, Modal, Search } from 'components';
import { useEventContext, useGlobalContext } from 'contexts';
import { SettingsHorizontal } from 'akar-icons';

export const Events: VFC = () => {
  const { translation } = useGlobalContext();
  const { events, filter, search } = useEventContext();
  const dialog = useDialogState();

  return (
    <>
      <DialogDisclosure
        {...dialog}
        className="style-btn bg-white px-3 text-cyan-700 outline-none transition-colors hover:bg-cyan-300"
      >
        {translation?.filterButton}
        <SettingsHorizontal size={20} className="ml-2" />
      </DialogDisclosure>
      <Modal title={translation?.filter} {...dialog}>
        <div className="my-4 flex flex-col items-start gap-4">
          <Filter {...filter.teemunkierros}>
            {translation?.teemunkierros}
          </Filter>
          <Filter {...filter.hervanta}>{translation?.hervanta}</Filter>
          <Filter {...filter.center}>{translation?.center}</Filter>
          <Filter {...filter.elsewhere}>{translation?.elsewhere}</Filter>
          <Filter {...filter.needsRegistration}>
            {translation?.registration}
          </Filter>
          <Filter {...filter.hasMusic}>{translation?.music}</Filter>
          <Filter {...filter.inside}>{translation?.inside}</Filter>
          <Filter {...filter.outside}>{translation?.outside}</Filter>
          <Filter {...filter.isRemote}>{translation?.remote}</Filter>
        </div>

        <Search {...search} label={translation?.searchPlaceholder} />
      </Modal>

      <EventList events={events} />

      <Outlet />
    </>
  );
};
