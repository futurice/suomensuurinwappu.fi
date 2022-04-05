import { FC } from 'react';
import { LinkProps } from 'react-router-dom';
import { ChevronRight } from 'akar-icons';

import { LocalizedLink } from 'contexts';
import { cn } from 'utils';

interface NavLinkProps extends LinkProps {}

export const NavLink: FC<NavLinkProps> = ({ to, children, ...props }) => (
  <LocalizedLink
    to={to}
    className={({ isActive }) =>
      cn(
        'style-heading flex items-center border-b border-pink-300 py-4 px-2 text-cyan-700 hover:underline',
        {
          "before:-my-2 before:-ml-2 before:mr-2 before:text-2xl before:content-['•'] hover:no-underline":
            isActive,
        }
      )
    }
    {...props}
  >
    {children}
    <ChevronRight size={20} className="ml-auto" />
  </LocalizedLink>
);
