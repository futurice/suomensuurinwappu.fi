import { useEffect, useRef, useState, VFC } from 'react';
import { useParams } from 'react-router-dom';
import { Dialog, DialogBackdrop, useDialogState } from 'reakit/Dialog';

import { EventInfo, Image, RichText } from 'components';
import { useEvent, useEventContext, useGlobalContext } from 'contexts';
import { Favourite } from 'components/Favourite';

export const EventModal: VFC = () => {
  const { slug } = useParams<'slug'>();
  const { event, closeEvent } = useEvent(slug);

  // Controls the favourite icon state
  const [ isFavourite, setIsFavourite ] = useState(false);

  const { currentRef } = useEventContext();
  const { translation } = useGlobalContext();
  const dialog = useDialogState({ visible: true, animated: true });
  const labelId = `${dialog.baseId}-label`;
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!dialog.visible && !dialog.animating) {
      closeEvent();
    } else {
      modalRef.current?.focus();
    }
  }, [closeEvent, dialog.visible, dialog.animating]);

  useEffect(() => {
    const previousFavourites = JSON.parse(localStorage.getItem('WAPPU_FAVOURITES') || '[]');
    setIsFavourite(previousFavourites.includes(event?.slug));
  }, [setIsFavourite, event?.slug])

  const addToFavourites = (e: any) => {
    const previousFavourites = JSON.parse(localStorage.getItem('WAPPU_FAVOURITES') || '[]');
    let newFavourites = previousFavourites;
    if (isFavourite) {
      newFavourites = newFavourites.filter((item: any) => item !== event?.slug);
    } else {
      newFavourites = [...previousFavourites, event?.slug];
    }
    setIsFavourite(!isFavourite);
    localStorage.setItem('WAPPU_FAVOURITES', JSON.stringify(newFavourites));
  }

  return (
    <DialogBackdrop
      className="bg-backdrop enter:opacity-100 fixed inset-0 flex items-end justify-center pt-20 opacity-0 transition-opacity duration-300 sm:items-center sm:p-4"
      {...dialog}
    >
      <Dialog
        aria-labelledby={labelId}
        unstable_finalFocusRef={currentRef}
        tabIndex={0}
        ref={modalRef}
        className="style-focus enter:translate-y-0 enter:scale-100 inset-x-0 bottom-0 flex max-h-full max-w-lg translate-y-full flex-col rounded-t-lg bg-white drop-shadow-lg transition-transform duration-300 sm:rounded-lg md:scale-50"
        preventBodyScroll={false}
        {...dialog}
      >
        <Image
          className="h-64 max-h-[30vh] w-full rounded-t-lg object-cover"
          crop="1024x512"
          img={event?.content.image}
        />
        <Favourite fill={isFavourite} addToFavourites={addToFavourites} />
        <div className="flex flex-initial flex-col gap-1 overflow-hidden p-4">
          <h2
            id={labelId}
            className="style-heading text-lg text-pink-700 outline-none focus:underline"
          >
            {event?.content.title}
          </h2>
          {event && (
            <div className="flex-initial flex-col overflow-auto text-sm">
              <div className="mb-1 flex flex-col gap-1">
                <EventInfo {...event.content} />
              </div>
              <RichText>{event.content.description}</RichText>
              <button
                onClick={closeEvent}
                className="style-btn mx-auto mt-2 mb-4 flex-none bg-cyan-700 px-3 text-white transition-colors hover:bg-cyan-900"
              >
                {translation?.backToCalendar}
              </button>
            </div>
          )}
        </div>
      </Dialog>
    </DialogBackdrop>
  );
};
