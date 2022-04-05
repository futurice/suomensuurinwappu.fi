import { FC } from 'react';

import { FilterProps } from 'contexts';
import { cn } from 'utils';

export const Filter: FC<FilterProps> = ({ children, checked, ...props }) => (
  <label
    className={cn(
      'style-btn cursor-pointer border border-cyan-700 px-3 transition-colors focus-within:ring',
      checked
        ? 'bg-cyan-700 text-white hover:bg-cyan-900'
        : 'bg-white text-cyan-700 hover:bg-cyan-300'
    )}
  >
    <input type="checkbox" checked={checked} className="sr-only" {...props} />
    {children}
  </label>
);
