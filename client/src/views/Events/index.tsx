import {
  ComponentProps,
  FormEventHandler,
  useCallback,
  useRef,
  VFC,
} from 'react';
import { Outlet } from 'react-router-dom';
import { useDialogState } from 'reakit/Dialog';
import { Calendar, SettingsHorizontal } from 'akar-icons';

import { Disclosure, EventList, Filter, Modal } from 'components';
import { useEventContext, useGlobalContext } from 'contexts';

import { Dates } from './Dates';
import { Filters } from './Filters';

interface ResetButtonProps extends Pick<ComponentProps<'button'>, 'onClick'> {
  visible: boolean;
}

const ResetButton: VFC<ResetButtonProps> = ({ onClick, visible }) => {
  const { translation } = useGlobalContext();

  return visible ? (
    <button
      onClick={onClick}
      className="style-btn mx-auto mt-6 flex-none bg-cyan-700 px-3 text-white transition-colors hover:bg-cyan-900"
    >
      {translation?.filterReset}
    </button>
  ) : null;
};

export const Events: VFC = () => {
  const { translation } = useGlobalContext();
  const { count, events, reset, filter } = useEventContext();

  const dateDialog = useDialogState({ animated: true });
  const dateRef = useRef<HTMLDivElement>(null);

  const onDateReset = useCallback(() => {
    dateRef.current?.focus();
    reset.date();
  }, [reset]);

  const filterDialog = useDialogState({ animated: true });
  const filterRef = useRef<HTMLDivElement>(null);

  const onFilterReset = useCallback(() => {
    filterRef.current?.focus();
    reset.filter();
  }, [reset]);

  const hideFilters = filterDialog.hide;
  const onFilterSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();
      hideFilters();
    },
    [hideFilters]
  );

  return (
    <>
      <div className="m-auto flex max-w-7xl justify-between">
        <div className="flex max-w-7xl space-x-2">
          <Disclosure icon={Calendar} {...dateDialog}>
            {translation?.date}
            {count.date > 0 && <> ({count.date})</>}
          </Disclosure>
          <Modal
            ref={dateRef}
            alignLeft={true}
            title={translation?.date}
            {...dateDialog}
          >
            <Dates />

            <ResetButton onClick={onDateReset} visible={count.date > 0} />
          </Modal>
          <Filter {...filter.teemunkierros}>{translation?.teemunkierros}</Filter>
        </div>

        <Disclosure icon={SettingsHorizontal} {...filterDialog}>
          {translation?.filterButton}
          {count.filter > 0 && <> ({count.filter})</>}
        </Disclosure>
        <Modal ref={filterRef} title={translation?.filter} {...filterDialog}>
          <Filters onSubmit={onFilterSubmit} />

          <ResetButton onClick={onFilterReset} visible={count.filter > 0} />
        </Modal>
      </div>

      <EventList events={events} />

      <Outlet />
    </>
  );
};
