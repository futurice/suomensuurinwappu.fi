import { DocumentNode, useQuery } from '@apollo/client';

import { useLanguageContext } from 'contexts';
import { QueryResponse } from 'interfaces';

export const useStoryblokQuery = <TItem>(key: string, query: DocumentNode) => {
  const { langParam } = useLanguageContext();
  const { data, ...rest } = useQuery<QueryResponse<typeof key, TItem>>(query, {
    variables: { langParam },
  });

  return {
    data: data ? data[key].items : [],
    ...rest,
  };
};
