import { FC, VFC } from 'react';
import { Search as MagnifyingGlass } from 'akar-icons';
import { SearchProps, useGlobalContext } from 'contexts';

import './Styles.css';

const searchEvents = (e: any, onChange: any) => {
  e.preventDefault();
  onChange(e);
};

const SearchIcon: VFC = () => {
  return (
    <MagnifyingGlass
      size={16}
      className="mr-2 ml-1 flex flex-none items-center text-xs text-cyan-700"
      aria-label="Search"
    />
  );
};

export const Search: FC<SearchProps> = (search) => {
  const { translation } = useGlobalContext();

  return (
    <label className="search flex items-center" aria-label={translation?.searchPlaceholder}>
      <SearchIcon />
      <input
        type="search"
        name="event-search"
        id="eventSearch"
        placeholder={translation?.searchPlaceholder}
        onChange={(e) => searchEvents(e, search.onChange)}
      />
    </label>
  );
};
