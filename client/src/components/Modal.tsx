import { ComponentProps, FC, RefObject } from 'react';
import {
  Dialog,
  DialogBackdrop,
  DialogOptions,
  DialogStateReturn,
} from 'reakit/Dialog';

interface ModalProps
  extends Omit<DialogOptions, 'baseId'>,
    ComponentProps<'div'> {
  dialog: DialogStateReturn;
  modalRef: RefObject<HTMLDivElement>;
}

export const Modal: FC<ModalProps> = ({
  children,
  dialog,
  modalRef,
  ...props
}) => (
  <DialogBackdrop
    className="bg-backdrop fixed inset-0 flex items-end justify-center sm:items-center sm:p-4"
    {...dialog}
  >
    <Dialog
      ref={modalRef}
      className="style-focus inset-x-0 bottom-0 flex max-h-full max-w-lg flex-col rounded-t-lg bg-white drop-shadow-lg sm:rounded-lg"
      {...dialog}
      {...props}
    >
      {children}
    </Dialog>
  </DialogBackdrop>
);
