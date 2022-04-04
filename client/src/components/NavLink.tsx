import { FC } from 'react';
import { LinkProps } from 'react-router-dom';
import { ChevronRight } from 'akar-icons';

import { LocalizedLink } from 'contexts';
import { cn } from 'utils';

interface NavLinkProps extends LinkProps {}

export const NavLink: FC<NavLinkProps> = ({ to, children, ...props }) => (
  <LocalizedLink
    to={to}
    className={cn(
      'style-heading flex items-center justify-between border-b border-pink-300 py-4 px-2 text-cyan-700 hover:underline'
    )}
    {...props}
  >
    {children}
    <ChevronRight size={20} />
  </LocalizedLink>
);
