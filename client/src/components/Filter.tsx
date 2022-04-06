import { FC } from 'react';

import { FilterProps } from 'contexts';
import { useEnterClick } from 'hooks';
import { cn } from 'utils';

export const Filter: FC<FilterProps> = ({
  children,
  checked,
  onChange,
  value,
}) => {
  const enterClick = useEnterClick();

  return (
    <label
      className={cn(
        'style-btn cursor-pointer border border-cyan-700 px-3 transition-colors focus-within:ring',
        checked
          ? 'bg-cyan-700 text-white hover:bg-cyan-900'
          : 'bg-white text-cyan-700 hover:bg-cyan-300'
      )}
      {...enterClick}
    >
      <input
        type="checkbox"
        checked={checked}
        className="sr-only"
        onChange={onChange}
        value={value}
      />
      {children}
    </label>
  );
};
