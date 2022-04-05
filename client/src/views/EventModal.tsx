import { useEffect, useRef, VFC } from 'react';
import { useParams } from 'react-router-dom';
import { useDialogState } from 'reakit/Dialog';

import { EventInfo, Image, Modal, RichText } from 'components';
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
    <Modal
      aria-labelledby={labelId}
      dialog={dialog}
      unstable_finalFocusRef={currentRef}
      modalRef={modalRef}
      tabIndex={0}
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
          className="style-focus mx-auto my-4 block rounded-full bg-cyan-700 py-2 px-4 font-bold text-white outline-none"
        >
          {translation?.backToCalendar}
        </button>
      </div>
    </Modal>
  );
};
