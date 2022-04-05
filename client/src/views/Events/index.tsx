import { VFC } from 'react';
import { Outlet } from 'react-router-dom';
import { useDialogState } from 'reakit/Dialog';
import { Calendar, SettingsHorizontal } from 'akar-icons';

import { Disclosure, EventList, Modal } from 'components';
import { useEventContext, useGlobalContext } from 'contexts';

import { Dates } from './Dates';
import { Filters } from './Filters';

export const Events: VFC = () => {
  const { translation } = useGlobalContext();
  const { dateSelect, events, filterCount } = useEventContext();

  const dateDialog = useDialogState();
  const filterDialog = useDialogState();

  return (
    <>
      <div className="m-auto flex max-w-7xl justify-between">
        <Disclosure icon={Calendar} {...dateDialog}>
          {translation?.date}
          {dateSelect.selected.length > 0 && (
            <> ({dateSelect.selected.length})</>
          )}
        </Disclosure>
        <Modal alignLeft={true} title={translation?.date} {...dateDialog}>
          <Dates />
        </Modal>

        <Disclosure icon={SettingsHorizontal} {...filterDialog}>
          {translation?.filterButton}
          {filterCount > 0 && <> ({filterCount})</>}
        </Disclosure>
        <Modal title={translation?.filter} {...filterDialog}>
          <Filters />
        </Modal>
      </div>

      <EventList events={events} />

      <Outlet />
    </>
  );
};
