import { forwardRef, PropsWithChildren, ReactNode } from 'react';
import { Dialog, DialogBackdrop, DialogStateReturn } from 'reakit/Dialog';
import { Cross } from 'akar-icons';

import { useGlobalContext } from 'contexts';
import { cn } from 'utils';

interface ModalProps extends DialogStateReturn {
  alignLeft?: boolean;
  title?: string;
  titleAddition?: ReactNode;
}

export const Modal = forwardRef<HTMLDivElement, PropsWithChildren<ModalProps>>(
  ({ alignLeft, children, title, titleAddition, ...dialog }, ref) => {
    const { translation } = useGlobalContext();
    const labelId = `${dialog.baseId}-label`;

    return (
      <DialogBackdrop
        className="bg-backdrop enter:opacity-100 fixed inset-0 p-4 pt-20 opacity-0 duration-300"
        {...dialog}
      >
        <div className="relative m-auto h-full max-w-7xl">
          <Dialog
            ref={ref}
            className={cn(
              'style-focus enter:scale-100 absolute top-0 flex max-h-full w-full max-w-lg flex-initial scale-0 flex-col rounded-lg rounded-tl bg-white pt-6 pb-0 outline-none drop-shadow-lg transition-transform duration-300',
              alignLeft ? 'left-0 origin-top-left' : 'right-0 origin-top-right'
            )}
            aria-labelledby={labelId}
            tabIndex={0}
            preventBodyScroll={false}
            {...dialog}
          >
            <div className="mx-6 flex flex-none items-center border-b border-cyan-500 pb-4">
              <h2
                id={labelId}
                className="style-heading flex-1 text-lg text-pink-700"
              >
                {title}
              </h2>
              {titleAddition ? (
                titleAddition
              ) : (
                <button
                  className="style-btn w-8 text-cyan-700 outline-none hover:bg-cyan-500/20"
                  onClick={dialog.hide}
                >
                  <Cross size={20} aria-label={translation?.backToCalendar} />
                </button>
              )}
            </div>
            <div className="flex-initial overflow-auto p-6 pt-0">
              {children}
            </div>
          </Dialog>
        </div>
      </DialogBackdrop>
    );
  }
);
