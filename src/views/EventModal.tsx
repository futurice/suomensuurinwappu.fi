import { useParams } from 'react-router-dom';
import { render } from 'storyblok-rich-text-react-renderer';
import { useDialogState, Dialog, DialogBackdrop } from 'reakit/Dialog';

import { Image } from 'components';
import { useEvent } from 'contexts';
import { EventItem } from 'interfaces';
import { formatTimeRange } from 'utils';
import { useEffect } from 'react';

const Content = ({ content }: Pick<EventItem, 'content'>) => (
  <>
    <p>{formatTimeRange(content.dateBegin, content.dateEnd)}</p>
    <p>{content.location}</p>
    <p>{content.organizer}</p>
    {render(content.description)}
  </>
);

export const EventModal = () => {
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
    <>
      <DialogBackdrop {...dialog} className="absolute inset-0 bg-backdrop">
        <Dialog
          {...dialog}
          tabIndex={0}
          aria-labelledby={labelId}
          className="absolute inset-x-0 bottom-0 rounded-t-lg bg-white"
        >
          <Image
            className="h-64 w-full rounded-t-lg object-cover"
            src={event?.content.image.filename}
            alt={event?.content.image.alt}
          />
          <div className="p-4 pb-8">
            <h2 id={labelId} className="text-lg font-bold">
              {event?.content.title}
            </h2>
            {event && <Content content={event.content} />}
            <button
              onClick={closeEvent}
              className="mx-auto block rounded-full bg-cyan-700 py-2 px-4 font-bold text-white"
            >
              Takaisin kalenteriin
            </button>
          </div>
        </Dialog>
      </DialogBackdrop>
    </>
  );
};
