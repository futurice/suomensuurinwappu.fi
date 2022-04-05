import { FC } from 'react';

import { FilterProps } from 'contexts';
import { cn } from 'utils';

export const Filter: FC<FilterProps> = ({ children, checked, ...props }) => (
  <label
    className={cn(
      'style-focus mr-1 inline-flex cursor-pointer rounded-full border border-cyan-700 py-1 px-3 text-sm font-bold transition-colors focus-within:ring',
      checked ? 'bg-cyan-700 text-white' : 'bg-white text-cyan-700'
    )}
  >
    <input type="checkbox" checked={checked} className="sr-only" {...props} />
    {children}
  </label>
);
