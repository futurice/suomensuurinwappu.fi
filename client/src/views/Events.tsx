import { VFC } from 'react';
import { Outlet } from 'react-router-dom';
import { DialogDisclosure, useDialogState } from 'reakit/Dialog';

import { EventList, Filter, Modal, Search } from 'components';
import { useEventContext, useGlobalContext } from 'contexts';
import { Cross, SettingsHorizontal } from 'akar-icons';

export const Events: VFC = () => {
  const { translation } = useGlobalContext();
  const { events, filter, filterCount, filterReset } = useEventContext();
  const dialog = useDialogState();

  return (
    <>
      <DialogDisclosure
        {...dialog}
        className="style-btn bg-white px-3 text-cyan-700 outline-none transition-colors hover:bg-cyan-300"
      >
        {translation?.filterButton}
        {filterCount > 0 && <> ({filterCount})</>}
        <SettingsHorizontal size={20} className="ml-2" />
      </DialogDisclosure>
      <Modal
        title={translation?.filter}
        titleAddition={
          <button
            className="style-btn w-8 text-cyan-700 outline-none hover:bg-cyan-500/20"
            onClick={dialog.hide}
          >
            <Cross size={20} aria-label={translation?.backToCalendar} />
          </button>
        }
        {...dialog}
      >
        <div className="my-4 flex flex-col items-start gap-4">
          <Filter {...filter.teemunkierros}>
            {translation?.teemunkierros}
          </Filter>

          <div className="flex flex-wrap gap-2">
            <Filter {...filter.hervanta}>{translation?.hervanta}</Filter>
            <Filter {...filter.center}>{translation?.center}</Filter>
            <Filter {...filter.elsewhere}>{translation?.elsewhere}</Filter>
          </div>

          <Filter {...filter.needsRegistration}>
            {translation?.registration}
          </Filter>
          <Filter {...filter.hasMusic}>{translation?.music}</Filter>

          <div className="flex flex-wrap gap-2">
            <Filter {...filter.inside}>{translation?.inside}</Filter>
            <Filter {...filter.outside}>{translation?.outside}</Filter>
          </div>

          <Filter {...filter.isRemote}>{translation?.remote}</Filter>
        </div>

        <Search {...filter.search} label={translation?.searchPlaceholder} />

        {filterCount > 0 && (
          <button
            onClick={filterReset}
            className="style-btn mx-auto mt-6 flex-none bg-cyan-700 px-3 text-white transition-colors hover:bg-cyan-900"
          >
            {translation?.filterReset}
          </button>
        )}
      </Modal>

      <EventList events={events} />

      <Outlet />
    </>
  );
};
