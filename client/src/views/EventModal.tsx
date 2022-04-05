import { useEffect, useRef, VFC } from 'react';
import { useParams } from 'react-router-dom';
import { Dialog, DialogBackdrop, useDialogState } from 'reakit/Dialog';

import { EventInfo, Image, RichText } from 'components';
import { useEvent, useEventContext, useGlobalContext } from 'contexts';

export const EventModal: VFC = () => {
  const { slug } = useParams<'slug'>();
  const { event, closeEvent } = useEvent(slug);

  const { currentRef } = useEventContext();
  const { translation } = useGlobalContext();
  const dialog = useDialogState({ visible: true });
  const labelId = `${dialog.baseId}-label`;
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!dialog.visible) {
      closeEvent();
    } else {
      modalRef.current?.focus();
    }
  }, [closeEvent, dialog.visible]);

  return (
    <DialogBackdrop
      className="bg-backdrop fixed inset-0 flex items-end justify-center pt-20 sm:items-center sm:p-4"
      {...dialog}
    >
      <Dialog
        aria-labelledby={labelId}
        unstable_finalFocusRef={currentRef}
        tabIndex={0}
        ref={modalRef}
        className="style-focus inset-x-0 bottom-0 flex max-h-full max-w-lg flex-col rounded-t-lg bg-white drop-shadow-lg sm:rounded-lg"
        {...dialog}
      >
        <Image
          className="h-64 w-full rounded-t-lg object-cover"
          crop="1024x512"
          img={event?.content.image}
        />
        <div className="flex flex-initial flex-col gap-1 overflow-hidden p-4">
          <h2
            id={labelId}
            className="style-heading text-lg text-pink-700 outline-none focus:underline"
          >
            {event?.content.title}
          </h2>
          {event && (
            <>
              <EventInfo {...event.content} />
              <div className="flex-initial flex-col overflow-auto text-sm">
                <RichText>{event.content.description}</RichText>
              </div>
            </>
          )}
          <button
            onClick={closeEvent}
            className="style-btn mx-auto mb-4 flex-none bg-cyan-700 px-3 text-white transition-colors hover:bg-cyan-900"
          >
            {translation?.backToCalendar}
          </button>
        </div>
      </Dialog>
    </DialogBackdrop>
  );
};
