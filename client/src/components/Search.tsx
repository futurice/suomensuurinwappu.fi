import { ComponentProps, useState, VFC } from 'react';

import './LanguageSwitcher.css';
import { Search as MagnifyingClass } from 'akar-icons';

// TODO: Magic goes here
const searchEvents = (e: any) => {
  e.preventDefault();
  console.log(e);
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

export const Search: VFC<Pick<ComponentProps<'div'>, 'className'>> = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <form onSubmit={(e) => searchEvents(e)} className="search">
      <SearchIcon />
      <input
        type="text"
        name="event-search"
        value={searchTerm}
        placeholder={'Hae tapahtumaa'}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </form>
  );
};
