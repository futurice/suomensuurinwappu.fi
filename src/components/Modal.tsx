import { ComponentProps, FC } from 'react';
import { Dialog, DialogBackdrop, DialogStateReturn } from 'reakit/Dialog';

interface ModalProps extends ComponentProps<'div'> {
  dialog: DialogStateReturn;
}

export const Modal: FC<ModalProps> = ({ children, dialog, ...props }) => (
  <DialogBackdrop className="absolute inset-0 bg-backdrop" {...dialog}>
    <Dialog
      className="absolute inset-x-0 bottom-0 rounded-t-lg bg-white"
      {...dialog}
      {...props}
    >
      {children}
    </Dialog>
  </DialogBackdrop>
);
