import { FC, ReactNode } from 'react';
import { Dialog, DialogBackdrop, DialogStateReturn } from 'reakit/Dialog';

interface ModalProps extends DialogStateReturn {
  title?: string;
  titleAddition?: ReactNode;
}

export const Modal: FC<ModalProps> = ({
  children,
  title,
  titleAddition,
  ...dialog
}) => {
  const labelId = `${dialog.baseId}-label`;

  return (
    <DialogBackdrop
      className="bg-backdrop absolute inset-0 p-4 pt-20"
      {...dialog}
    >
      <div className="relative m-auto h-full max-w-7xl">
        <Dialog
          className="style-focus absolute top-0 right-0 flex max-h-full w-full max-w-lg flex-initial flex-col rounded-md rounded-tl bg-white pt-6 pb-0 outline-none drop-shadow-lg"
          aria-labelledby={labelId}
          tabIndex={0}
          {...dialog}
        >
          <div className="mx-6 flex flex-none items-center border-b border-cyan-500 pb-4">
            <h2
              id={labelId}
              className="style-heading flex-1 text-lg text-pink-700"
            >
              {title}
            </h2>
            {titleAddition}
          </div>
          <div className="flex-initial overflow-scroll p-6 pt-0">
            {children}
          </div>
        </Dialog>
      </div>
    </DialogBackdrop>
  );
};
