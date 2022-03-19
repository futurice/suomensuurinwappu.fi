import { useEffect, VFC } from 'react';
import { useParams } from 'react-router-dom';
import { useDialogState } from 'reakit/Dialog';
import { render } from 'storyblok-rich-text-react-renderer';

import { EventInfo, Image, Modal } from 'components';
import { useEvent } from 'contexts';

export const EventModal: VFC = () => {
  const { slug } = useParams<'slug'>();
  const { event, closeEvent } = useEvent(slug);
  const dialog = useDialogState({ visible: true });

  const labelId = `${dialog.baseId}-label`;

  useEffect(() => {
    if (!dialog.visible) {
      closeEvent();
    }
  }, [closeEvent, dialog.visible]);

  return (
    <Modal aria-labelledby={labelId} tabIndex={0} dialog={dialog}>
      <Image
        className="h-64 w-full rounded-t-lg object-cover"
        src={event?.content.image.filename}
        alt={event?.content.image.alt}
      />
      <div className="flex flex-initial flex-col gap-1 overflow-hidden p-4">
        <h2 id={labelId} className="style-heading text-lg text-pink-700">
          {event?.content.title}
        </h2>
        {event && (
          <>
            <EventInfo {...event.content} />
            <div className="flex flex-initial flex-col gap-2 overflow-auto pt-2 text-sm">
              {render(event.content.description)}
            </div>
          </>
        )}
        <button
          onClick={closeEvent}
          className="mx-auto my-4 block rounded-full bg-cyan-700 py-2 px-4 font-bold text-white"
        >
          Takaisin kalenteriin
        </button>
      </div>
    </Modal>
  );
};
