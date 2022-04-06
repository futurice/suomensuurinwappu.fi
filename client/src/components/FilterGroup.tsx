import {
  createContext,
  PropsWithChildren,
  ReactElement,
  useContext,
  useMemo,
} from 'react';

import { FilterGroupProps, useGlobalContext } from 'contexts';
import { cn } from 'utils';

const FilterGroupContext = createContext<
  Pick<FilterGroupProps<string>, 'name' | 'value' | 'onChange'>
>({
  name: '',
  onChange: () => undefined,
});

interface GroupItemProps<TFilter extends string> {
  value?: TFilter;
}

export const FilterGroupItem = <TFilter extends string>({
  children,
  value,
}: PropsWithChildren<GroupItemProps<TFilter>>) => {
  const { name, value: selected, onChange } = useContext(FilterGroupContext);
  const checked = useMemo(() => selected === value, [selected, value]);

  return (
    <label
      className={cn(
        'style-btn cursor-pointer border border-cyan-700 px-3 transition-colors focus-within:ring',
        checked
          ? 'bg-cyan-700 text-white hover:bg-cyan-900'
          : 'bg-white text-cyan-700 hover:bg-cyan-300'
      )}
    >
      <input
        type="radio"
        checked={checked}
        className="sr-only"
        name={name}
        onChange={onChange}
        value={value}
      />
      {children}
    </label>
  );
};

interface GroupProps<TFilter extends string> extends FilterGroupProps<TFilter> {
  label?: string;
  children: ReactElement<GroupItemProps<TFilter>>[];
}

export const FilterGroup = <TFilter extends string>({
  label,
  name,
  value,
  onChange,
  children,
}: GroupProps<TFilter>) => {
  const { translation } = useGlobalContext();
  const labelId = `${name}-label`;

  return (
    <fieldset
      role="radiogroup"
      aria-labelledby={labelId}
      className="-mx-2 flex flex-wrap gap-2 rounded border border-pink-700 px-2 pb-2"
    >
      <legend
        id={labelId}
        className="style-heading relative bottom-0.5 px-2 text-sm text-pink-700"
      >
        {label}
      </legend>
      <FilterGroupContext.Provider value={{ name, value, onChange }}>
        <FilterGroupItem>{translation?.filterAll}</FilterGroupItem>
        {children}
      </FilterGroupContext.Provider>
    </fieldset>
  );
};
