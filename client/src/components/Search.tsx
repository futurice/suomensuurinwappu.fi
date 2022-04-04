import { FC, useState, VFC } from 'react';

import './Search.css';
import { Search as MagnifyingClass } from 'akar-icons';
import { SearchProps, useGlobalContext } from 'contexts';

const searchEvents = (e: any, onChange: any) => {
  e.preventDefault();
  onChange(e);
};

const SearchIcon: VFC = () => {
  return (
    <p className="flex items-center text-xs">
      <MagnifyingClass
        size={16}
        className="mr-2 ml-1 flex-none text-cyan-700"
      />
    </p>
  );
};

export const Search: FC<SearchProps> = (search) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { translation } = useGlobalContext();

  return (
    <div className="search">
      <SearchIcon />
      <input
        type="text"
        name="event-search"
        id="eventSearch"
        value={searchTerm}
        placeholder={translation?.searchPlaceholder}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          searchEvents(e, search.onChange);
        }}
      />
    </div>
  );
};
