import { FormEventHandler, VFC } from 'react';

import { Filter, FilterGroup, FilterGroupItem, Search } from 'components';
import { Location, Place, useEventContext, useGlobalContext } from 'contexts';

export const Filters: VFC<{ onSubmit: FormEventHandler<HTMLFormElement> }> = ({
  onSubmit,
}) => {
  const { translation } = useGlobalContext();
  const { filter } = useEventContext();

  return (
    <div className="mt-4 flex flex-col items-start gap-4">
      <Filter {...filter.teemunkierros}>{translation?.teemunkierros}</Filter>
      <Filter {...filter.isFavourite}>{translation?.favourites}</Filter>

      <FilterGroup {...filter.location} label={translation?.location}>
        <FilterGroupItem value={Location.Hervanta}>
          {translation?.hervanta}
        </FilterGroupItem>
        <FilterGroupItem value={Location.Center}>
          {translation?.center}
        </FilterGroupItem>
        <FilterGroupItem value={Location.Other}>
          {translation?.elsewhere}
        </FilterGroupItem>
      </FilterGroup>

      <FilterGroup {...filter.place} label={translation?.place}>
        <FilterGroupItem value={Place.Inside}>
          {translation?.inside}
        </FilterGroupItem>
        <FilterGroupItem value={Place.Outside}>
          {translation?.outside}
        </FilterGroupItem>
      </FilterGroup>

      <div className="flex flex-wrap gap-2">
        <Filter {...filter.needsRegistration}>
          {translation?.registration}
        </Filter>
        <Filter {...filter.hasMusic}>{translation?.music}</Filter>
        <Filter {...filter.isRemote}>{translation?.remote}</Filter>
        <Filter {...filter.isFree}>{translation?.free}</Filter>
        <Filter {...filter.isAccessible}>{translation?.accessible}</Filter>
        <Filter {...filter.isParty}>{translation?.party}</Filter>
        <Filter {...filter.isExercise}>{translation?.exercise}</Filter>
      </div>

      <Search
        {...filter.search}
        label={translation?.searchPlaceholder}
        onSubmit={onSubmit}
      />
    </div>
  );
};
