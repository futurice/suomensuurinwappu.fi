import { DialogDisclosure, DialogStateReturn } from 'reakit/Dialog';
import { Icon } from 'akar-icons';
import { FC } from 'react';

interface DisclosureProps extends DialogStateReturn {
  icon?: Icon;
}

export const Disclosure: FC<DisclosureProps> = ({
  children,
  icon: Icon,
  ...props
}) => (
  <DialogDisclosure
    {...props}
    className="style-btn bg-white px-3 text-cyan-700 outline-none drop-shadow transition-colors hover:bg-cyan-300"
  >
    {children}
    {Icon && <Icon size={20} className="ml-2" />}
  </DialogDisclosure>
);
