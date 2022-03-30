import { ComponentProps, FC } from 'react';
import { Dialog, DialogBackdrop, DialogStateReturn } from 'reakit/Dialog';

interface ModalProps extends ComponentProps<'div'> {
  dialog: DialogStateReturn;
}

export const Modal: FC<ModalProps> = ({ children, dialog, ...props }) => (
  <DialogBackdrop
    className="bg-backdrop fixed inset-0 flex items-end justify-center sm:items-center sm:p-4"
    {...dialog}
  >
    <Dialog
      className="inset-x-0 bottom-0 flex max-h-full max-w-lg flex-col rounded-t-lg bg-white sm:rounded-lg"
      {...dialog}
      {...props}
    >
      {children}
    </Dialog>
  </DialogBackdrop>
);
