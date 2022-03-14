import { FC } from 'react';
import { Icon } from 'akar-icons';

interface IconItemProps {
  icon: Icon;
}

export const IconItem: FC<IconItemProps> = ({ icon: Icon, children }) => (
  <p className="flex items-center text-sm">
    <Icon size={16} className="mr-1 flex-none text-pink-700" />
    {children}
  </p>
);
