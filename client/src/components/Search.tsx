import { FormEventHandler, VFC } from 'react';
import { Search as MagnifyingGlass } from 'akar-icons';

import { SearchProps } from 'contexts';

export const Search: VFC<
  SearchProps & { label?: string; onSubmit: FormEventHandler<HTMLFormElement> }
> = ({ label, onChange, onSubmit, value }) => (
  <form onSubmit={onSubmit} className="self-stretch">
    <label className="style-focus flex items-center rounded-sm border border-cyan-700 bg-white px-1 text-cyan-700 focus-within:ring">
      <MagnifyingGlass
        size={16}
        className="mr-2 ml-1 flex-none"
        aria-label={label}
      />
      <input
        type="search"
        className="h-8 flex-1 outline-none placeholder:text-cyan-700/60"
        onChange={onChange}
        placeholder={label}
        value={value}
      />
    </label>
  </form>
);
