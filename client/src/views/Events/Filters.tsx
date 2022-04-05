import { VFC } from 'react';

import { Filter, Search } from 'components';
import { useEventContext, useGlobalContext } from 'contexts';

export const Filters: VFC = () => {
  const { translation } = useGlobalContext();
  const { filter, filterCount, filterReset } = useEventContext();

  return (
    <>
      <div className="my-4 flex flex-col items-start gap-4">
        <Filter {...filter.teemunkierros}>{translation?.teemunkierros}</Filter>

        <div className="flex flex-wrap gap-2">
          <Filter {...filter.hervanta}>{translation?.hervanta}</Filter>
          <Filter {...filter.center}>{translation?.center}</Filter>
          <Filter {...filter.elsewhere}>{translation?.elsewhere}</Filter>
        </div>

        <Filter {...filter.needsRegistration}>
          {translation?.registration}
        </Filter>
        <Filter {...filter.hasMusic}>{translation?.music}</Filter>

        <div className="flex flex-wrap gap-2">
          <Filter {...filter.inside}>{translation?.inside}</Filter>
          <Filter {...filter.outside}>{translation?.outside}</Filter>
        </div>

        <Filter {...filter.isRemote}>{translation?.remote}</Filter>
      </div>

      <Search {...filter.search} label={translation?.searchPlaceholder} />

      {filterCount > 0 && (
        <button
          onClick={filterReset}
          className="style-btn mx-auto mt-6 flex-none bg-cyan-700 px-3 text-white transition-colors hover:bg-cyan-900"
        >
          {translation?.filterReset}
        </button>
      )}
    </>
  );
};
