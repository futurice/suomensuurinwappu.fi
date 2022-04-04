import { FC } from 'react';
import { ChevronRight } from 'akar-icons';

import { LocalizedLink } from 'contexts';

interface NavLinkProps {
  to: string;
}

export const NavLink: FC<NavLinkProps> = ({ to, children }) => (
  <LocalizedLink
    to={to}
    className="style-heading flex items-center justify-between border-b border-pink-300 py-4 px-2 text-cyan-700 hover:underline"
  >
    {children}
    <ChevronRight size={20} />
  </LocalizedLink>
);
